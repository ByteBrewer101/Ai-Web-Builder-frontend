import { CodeEditor } from "@/components/code-editor";
import FileExplorer from "@/components/file-explorer";
import { FileType } from "@/types";
import { StepsPanel } from "@/components/steps-panel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useCallTech } from "@/customHooks/queryhooks";
import { filesState, stepsState } from "@/states";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useWebContainer } from "@/customHooks/webContainerHooks";
import { HandleFolder } from "@/functions/FolderHandlers";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function ProductPage() {
  const { webcontainer } = useWebContainer();
  const [selectedFile, setSelectedFile] = useState<FileType>();
  const [files, setFiles] = useRecoilState(filesState);
  const [url, setUrl] = useState("");
  const [currentContent, setCurrentContent] = useState<string>("");

  const location = useLocation();
  const { prompt } = location.state || {};
  const { isloading } = useCallTech(prompt);
  const steps = useRecoilValue(stepsState);
  const nav = useNavigate();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      nav("/");
      toast.info("You are not signed in");
    }
  }, [isSignedIn, nav]);

  useEffect(() => {
    if (selectedFile?.content) {
      setCurrentContent(selectedFile.content);
    } else {
      setCurrentContent("");
    }
  }, [selectedFile]);

  const handleContentChange = (newContent: string) => {
    setCurrentContent(newContent);
  };

  const handleSave = () => {
    if (!selectedFile?.path) {
      toast.error("No file selected to save");
      return;
    }

    setFiles((prevFiles) =>
      updateFileContent(prevFiles, selectedFile.path, currentContent)
    );
    toast.success(`Saved ${selectedFile.name}`);
  };

  const updateFileContent = (
    files: FileType[],
    targetPath: string,
    newContent: string
  ): FileType[] => {
    return files.map((file) => {
      if (file.path === targetPath && !file.isFolder) {
        return { ...file, content: newContent };
      }
      if (file.isFolder) {
        return {
          ...file,
          //@ts-expect-error
          children: updateFileContent(file.children, targetPath, newContent),
        };
      }
      return file;
    });
  };
  useEffect(() => {
    if (!steps.length) return;

    setFiles((prevFiles) => {
      const updateFiles = (
        currentLevel: FileType[],
        pathParts: string[],
        codeContent: string,
        fullPath: string
      ): FileType[] => {
        const [currentPart, ...remainingParts] = pathParts;

        // File creation/update logic
        if (pathParts.length === 1) {
          const existingFile = currentLevel.find(
            (file) => file.name === currentPart && !file.isFolder
          );

          // Update existing file content
          if (existingFile) {
            return currentLevel.map((file) =>
              file.name === currentPart
                ? {
                    ...file,
                    content: codeContent,
                  }
                : file
            );
          }

          // Create new file with content
          return [
            ...currentLevel,
            {
              name: currentPart,
              path: fullPath,
              content: codeContent,
              isFolder: false,
            },
          ];
        }

        // Directory handling logic
        const existingDir = currentLevel.find(
          (file) => file.name === currentPart && file.isFolder
        );

        const newChildren = updateFiles(
          existingDir?.children || [],
          remainingParts,
          codeContent,
          fullPath
        );

        const updatedDir: FileType = {
          name: currentPart,
          path: pathParts.slice(0, -remainingParts.length).join("/"),
          isFolder: true,
          children: newChildren,
        };

        return existingDir
          ? currentLevel.map((file) =>
              file.name === currentPart ? updatedDir : file
            )
          : [...currentLevel, updatedDir];
      };

      // Process only active steps with code content
      return steps.reduce((fileAccumulator, step) => {
        if (step.status === "completed" || !step.path || !step.code) {
          return fileAccumulator;
        }

        const pathParts = step.path.split("/");
        return updateFiles(
          fileAccumulator,
          pathParts,
          step.code, // Using the step's code content
          step.path
        );
      }, prevFiles);
    });
  }, [steps, setFiles]);

  useEffect(() => {
    // Don't run if webcontainer isn't ready yet
    if (!webcontainer) return;

    async function handler() {
      try {
        // Process files
        const result = {};
        files.forEach((element) => {
          const fileResult = HandleFolder(element);
          Object.assign(result, fileResult);
        });

        console.log("Files to mount:", result);

        // Mount files
        await webcontainer?.mount(result);
        console.log("Files mounted successfully");

        console.log("Starting npm install...");
      await webcontainer?.spawn("npm", ["install", "react-router-dom"]);
        const installProcess = await webcontainer?.spawn("npm", ["install"]);

        const installExitCode = await new Promise((resolve) => {
          installProcess?.output.pipeTo(
            new WritableStream({
              write(data) {
                console.log("npm install output:", data);
              },
            })
          );
          installProcess?.exit.then(resolve);
        });

        if (installExitCode !== 0) {
          throw new Error(
            `npm install failed with exit code ${installExitCode}`
          );
        }
        console.log("npm install completed successfully");

        // Start dev server
        console.log("Starting dev server...");
        const devProcess = await webcontainer?.spawn("npm", ["run", "dev"]);

        

        // Listen for server-ready event
        webcontainer?.on("server-ready", (port,url) => {
          console.log("Server is ready at:", url, port);
          setUrl(url);
        });

        // Optional: Stream dev server output
        devProcess?.output.pipeTo(
          new WritableStream({
            write(data) {
              console.log("Dev server output:", data);
            },
          })
        );
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    handler();
  }, [files, webcontainer]);
  return (
    <div className="h-screen dark:bg-gray-900 pt-16">
      <div className="absolute opacity-40 -top-40 -left-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={25} minSize={20}>
          <StepsPanel steps={steps} />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={25} minSize={20}>
          <FileExplorer
            files={files}
            selectedFile={selectedFile}
            onSelectFile={setSelectedFile}
            loading={isloading}
          />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={50}>
          <div className="relative h-full flex flex-col">
            {selectedFile && (
              <div className="absolute bottom-10 right-10 z-10">
                <Button
                  onClick={handleSave}
                  variant="secondary"
                  size="lg"
                  className="flex bg-blue-950 hover:bg-blue-900 items-center gap-1"
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </div>
            )}
            <CodeEditor
              content={selectedFile?.content}
              url={url}
              onChange={handleContentChange}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
