import React from "react";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { Info, Play, Code2, Terminal, AlertCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { runCode } from "../../services/api";
import { ClimbingBoxLoader } from "react-spinners";
import { toast } from "react-toastify";

function CodeEditor() {
  const [code, setCode] = useState(
    "# Write your Python code here\nprint('Hello, World!')"
  );
  const [language, setLanguage] = useState("python");

  const languages = [
    { value: "python", label: "Python", icon: "🐍" },
    { value: "javascript", label: "JavaScript", icon: "⚡" },
  ];

  const { mutate, isPending, isError, data } = useMutation({
    mutationFn: runCode,
    onError: () => {
      toast.error("Failed to execute code");
    },
  });

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (newLang === "python") {
      setCode("# Write your Python code here\nprint('Hello, World!')");
    } else {
      setCode(
        "// Write your JavaScript code here\nconsole.log('Hello, World!');"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 h-[calc(100vh-120px)]">
        {/* Code Editor Section */}
        <div className="lg:col-span-2 bg-gray-900 border-r border-gray-800 flex flex-col">
          {/* Editor Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-700 flex-col sm:flex-row gap04">
            <div className="flex items-center gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => handleLanguageChange(lang.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    language === lang.value
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span className="mr-2">{lang.icon}</span>
                  {lang.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => mutate({ language, code })}
              disabled={isPending || !code.trim()}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                isPending || !code.trim()
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-600/50"
              }`}
            >
              <Play size={18} />
              {isPending ? "Running..." : "Run Code"}
            </button>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
                automaticLayout: true,
                scrollBeyondLastLine: false,
                renderLineHighlight: "all",
                lineNumbers: "on",
                glyphMargin: false,
                folding: true,
                padding: { top: 16, bottom: 16 },
              }}
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-1 bg-gray-950 flex flex-col h-full">
          <div className="px-4 py-3 bg-gray-900 border-b border-gray-800">
            <h2 className="font-bold text-lg text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-purple-500" />
              Output
            </h2>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {isError && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-medium mb-1">
                    Error Running Code
                  </p>
                  <p className="text-red-300 text-sm">
                    Please check your code and try again.
                  </p>
                </div>
              </div>
            )}

            {isPending ? (
              <div className="flex flex-col justify-center items-center h-full">
                <ClimbingBoxLoader color="#9333ea" size={15} />
                <p className="text-gray-500 mt-4 text-sm">
                  Executing your code...
                </p>
              </div>
            ) : (
              data && (
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <pre className="whitespace-pre-wrap text-green-400 font-mono text-sm overflow-auto">
                    {data}
                  </pre>
                </div>
              )
            )}

            {!data && !isPending && !isError && (
              <div className="flex flex-col justify-center items-center h-full text-center">
                <Terminal className="w-12 h-12 text-gray-700 mb-3" />
                <p className="text-gray-500 font-medium mb-1">No Output Yet</p>
                <p className="text-gray-600 text-sm">
                  Click "Run Code" to see the output
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
