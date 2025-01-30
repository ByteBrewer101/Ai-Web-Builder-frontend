/* eslint-disable react-hooks/rules-of-hooks */
import { CodeEditor } from "@/components/code-editor";
import FileExplorer, { FileType } from "@/components/file-explorer";
import { StepsPanel } from "@/components/steps-panel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { useCallTech } from "@/customHooks/queryhooks";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const steps = [
  { description: "Analyzing your prompt..." },
  { description: "Generating project structure..." },
  { description: "Creating base templates..." },
  { description: "Writing initial components..." },
  { description: "Finalizing project setup..." },
  { description: "Finalizing project setup..." },
  { description: "Finalizing project setup..." },
  { description: "Finalizing project setup..." },
  { description: "Finalizing project setup..." },
  { description: "Finalizing project setup..." },
  { description: "Finalizing project setup..." },
  { description: "Finalizing project setup..." },
  { description: "Finalizing project setup..." },
  { description: "Finalizing project setup..." },
  { description: "Finalizing project setup..." },
  { description: "Finalizing project setup..." },
  { description: "Finalizing project setup..." },
];

const files: FileType[] = [
  {
    name: "src",
    path: "src",
    isFolder: true,
    children: [
      {
        name: "App.tsx",
        path: "src/App.tsx",
        content:
          "export default function App() {\n  return <div>Hello World</div>\n}",
        isFolder: false,
      },
      {
        name: "components",
        path: "src/components",
        isFolder: true,
        children: [
          {
            name: "Button.tsx",
            path: "src/components/Button.tsx",
            content:
              "export default function Button() {\n  return <button>Click</button>\n}",
            isFolder: false,
          },
        ],
      },
    ],
  },
];

export default function ProductPage() {
  const [selectedFile, setSelectedFile] = useState<FileType>();
  const location = useLocation();
  const { prompt } = location.state || {}; // Access `prompt` from state
  const { data, isloading } = useCallTech(prompt);

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
          />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={50}>
          <CodeEditor content={selectedFile?.content} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
