import React from "react";
import { File, Folder } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FileType {
  name: string;
  path: string;
  content?: string;
  isFolder: boolean;
  children?: FileType[];
}

interface FileExplorerProps {
  files: FileType[];
  selectedFile?: FileType;
  onSelectFile: (file: FileType) => void;
}

export function FileExplorer({
  files,
  selectedFile,
  onSelectFile,
}: FileExplorerProps) {
  const renderTree = (items: FileType[]) => (
    <div className="space-y-1">
      {items.map((item) => (
        <div key={item.path}>
          {item.isFolder ? (
            <Accordion type="multiple">
              <AccordionItem value={item.path} className="border-0">
                <AccordionTrigger className="py-1 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Folder className="h-4 w-4 text-yellow-500" />
                    <span>{item.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4">
                    {item.children && renderTree(item.children)}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start gap-2",
                selectedFile?.path === item.path && "bg-accent"
              )}
              onClick={() => onSelectFile(item)}
            >
              <File className="h-4 w-4 text-blue-500" />
              {item.name}
            </Button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full p-4 border-r overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Project Files</h2>
      {renderTree(files)}
    </div>
  );
}

export default FileExplorer;
