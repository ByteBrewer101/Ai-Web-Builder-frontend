import Editor from "@monaco-editor/react";
import { useState } from "react";

interface CodeEditorProps {
  content?: string;
  url?:string
}

export function CodeEditor({ content,url }: CodeEditorProps) {
  const [view, setView] = useState(false);
  

  return (
    <div className="h-full p-2">
      <div className="flex justify-between items-center px-4 pt-4">
        <h2 className="text-xl font-semibold">Code</h2>
        <div className="space-x-2">
          <button
            onClick={() => setView(false)}
            className={`px-4 py-2 rounded-t-lg ${
              !view ? "bg-blue-500 text-white" : " text-black bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Code
          </button>
          <button
            onClick={() => setView(true)}
            className={`px-4 py-2 rounded-t-lg ${
              view ? "bg-blue-500 text-white" : " text-black bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      <div className="h-full mt-2">
        {!view ? (
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme={"vs-dark"}
            value={content ?? "// Select a file to view"}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        ) : (
          <div className="h-full  p-4  rounded-lg flex items-center justify-center">
            {!url &&<p className="text-gray-500 text-lg">
              Preview content will be displayed here...
              {/* Replace this with actual preview content later */}
        
            </p>}
            {
              url && <iframe src={url} className="w-full h-full" />

              
            }
          </div>
        )}
      </div>
    </div>
  );
}
