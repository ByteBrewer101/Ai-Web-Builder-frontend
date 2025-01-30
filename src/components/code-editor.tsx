import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  content?: string;
}

export function CodeEditor({ content }: CodeEditorProps) {
  return (
    <div className="h-full   ">
      <div className="flex px-4 pt-4 " >
        <h2 className="text-xl font-semibold mb-4">Code</h2>
      </div>
      <div className="h-full" >
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
      </div>
    </div>
  );
}
