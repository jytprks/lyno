import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";

import { CODE_SNIPPETS } from "../../constaints";
import LanguageSelector from "../languageSelector/LanguageSelector";
import { executeCode } from "../../api";

const CodeEditor = ({ handleOutPut }) => {
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const editorRef = useRef();
  //const [output, setOutPut] = useState(null);
  useEffect(() => {
    handleOutPut("");
    setValue(CODE_SNIPPETS[language]);
  }, [language]);

  const runCode = async () => {
    if (!value) return;
    try {
      const { run: result } = await executeCode(language, value);
      handleOutPut(result.output.split("\n"));
    } catch (err) {}
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();

    // Define custom SQL theme to match the image
    monaco.editor.defineTheme("sqlDarkTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6A9955", fontStyle: "italic" },
        { token: "keyword", foreground: "569CD6" },
        { token: "operator", foreground: "D4D4D4" },
        { token: "string", foreground: "CE9178" },
        { token: "identifier", foreground: "D4D4D4" },
        { token: "predefined", foreground: "4EC9B0" },
      ],
      colors: {
        "editor.background": "#0F0F0F",
        "editor.foreground": "#D4D4D4",
        "editorCursor.foreground": "#AEAFAD",
        "editor.lineHighlightBackground": "#0F0F0F",
        "editorLineNumber.foreground": "#858585",
        "editor.selectionBackground": "#264F78",
        "editor.inactiveSelectionBackground": "#3A3D41",
      },
    });

    // Apply the custom theme
    monaco.editor.setTheme("sqlDarkTheme");
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (editorRef.current) {
      editorRef.current.getModel().setLanguage(newLanguage);
    }
    setValue(CODE_SNIPPETS[newLanguage]);
  };

  return (
    <div style={{ height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <LanguageSelector language={language} onSelect={handleLanguageChange} />
        <button
          onClick={runCode}
          style={{
            backgroundColor: "#393053",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            marginBottom: "8px",
          }}
        >
          RUN
        </button>
      </div>
      <div
        style={{
          height: "calc(100% - 40px)",
          width: "100%",
          border: "1px solid #333",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "#393053",
            padding: "4px 8px",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #333",
          }}
        >
          <span style={{ color: "white", fontFamily: "monospace" }}>
            Hello world
          </span>
          <span style={{ marginLeft: "auto", color: "#888" }}>Auto</span>
        </div>
        <Editor
          height="100%"
          defaultLanguage={language}
          defaultValue={CODE_SNIPPETS[language]}
          onMount={handleEditorDidMount}
          value={value}
          onChange={(value) => setValue(value)}
          options={{
            fontSize: 14,
            fontFamily: "Consolas, 'Courier New', monospace",
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            folding: true,
            automaticLayout: true,
            scrollbar: {
              vertical: "visible",
              horizontal: "visible",
              useShadows: false,
              verticalHasArrows: false,
              horizontalHasArrows: false,
            },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
