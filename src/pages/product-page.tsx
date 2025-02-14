/* eslint-disable react-hooks/rules-of-hooks */
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
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useWebContainer } from "@/customHooks/webContainerHooks";
import { HandleFolder } from "@/functions/FolderHandlers";
// import { createFolder } from "@/functions/FolderHandlers";





export default function ProductPage() {
  const { webcontainer } = useWebContainer();
  const [selectedFile, setSelectedFile] = useState<FileType>();
  const [files, setFiles] = useRecoilState(filesState);
  const [url, setUrl] = useState("");

  const location = useLocation();
  const { prompt } = location.state || {}; // Access `prompt` from state
  const { isloading } = useCallTech(prompt);
  const steps = useRecoilValue(stepsState);

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
        await webcontainer.mount(result);
        console.log("Files mounted successfully");

        // Install dependencies
        console.log("Starting npm install...");
        const installProcess = await webcontainer.spawn("npm", ["install"]);

        // Stream the output
        const installExitCode = await new Promise((resolve) => {
          installProcess.output.pipeTo(
            new WritableStream({
              write(data) {
                console.log("npm install output:", data);
              },
            })
          );
          installProcess.exit.then(resolve);
        });

        if (installExitCode !== 0) {
          throw new Error(
            `npm install failed with exit code ${installExitCode}`
          );
        }
        console.log("npm install completed successfully");

        // Start dev server
        console.log("Starting dev server...");
        const devProcess = await webcontainer.spawn("npm", ["run", "dev"]);

        // Listen for server-ready event
        webcontainer.on("server-ready", (port, url) => {
          console.log("Server is ready at:", url);
          setUrl(url);
        });

        // Optional: Stream dev server output
        devProcess.output.pipeTo(
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
  }, [files, webcontainer]); // Keep both dependencies

  return (
    <div className="h-screen pt-10">
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
          <CodeEditor content={selectedFile?.content} url={url} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
