import Editor from "@monaco-editor/react";
import { useState } from "react";

interface CodeEditorProps {
  content?: string;
  url?: string;
}

export function CodeEditor({ content, url }: CodeEditorProps) {
  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(true);

  function handler() {
    setLoading(false);
  }

  return (
    <div className="h-full">
      <div className="flex justify-between items-center px-4 pt-4">
        <h2 className="text-xl font-semibold">Code</h2>
        <div className="space-x-2">
          <button
            onClick={() => {
              setView(false);
              setLoading(true);
            }}
            className={`px-4 py-2 rounded-t-lg ${
              !view
                ? "bg-blue-950 text-white"
                : " text-black bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Code
          </button>
          <button
            onClick={() => setView(true)}
            className={`px-4 py-2 rounded-t-lg ${
              view
                ? "bg-blue-950 text-white"
                : " text-black bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      <div className="h-full ">
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
          <div className="h-full   rounded-lg flex items-center justify-center">
            {!url && (
              <p className="text-gray-500 text-lg">
                Preview content will be displayed here...
             
              </p>
            )}
            {url && (
              <div className="relative w-full h-full">
             
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-black">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                )}

               
                <iframe
                  src={url}
                  className={`w-full h-full ${
                    loading ? "invisible" : "visible"
                  }`} 
                  onLoad={handler} 
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
