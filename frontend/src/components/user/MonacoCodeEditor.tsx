import Editor, { type OnMount } from '@monaco-editor/react';
import { Loader2 } from 'lucide-react';
import { useRef } from 'react';
import type * as Monaco from 'monaco-editor';

interface MonacoCodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language?: 'html' | 'css' | 'javascript' | 'php' | 'sql';
  readOnly?: boolean;
}

export default function MonacoCodeEditor({ 
  code, 
  onChange, 
  language = 'html',
  readOnly = false
}: MonacoCodeEditorProps) {
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
    // Focus editor when mounted
    editor.focus();
  };

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  return (
    <div className="h-full w-full bg-[#1e1e1e]">
      <Editor
        height="100%"
        width="100%"
        language={language}
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorMount}
        theme="vs-dark"
        loading={
          <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
            <Loader2 className="h-6 w-6 animate-spin text-cyan-500" />
            <span className="ml-2 text-slate-400 text-sm">Loading Monaco Editor...</span>
          </div>
        }
        options={{
          fontSize: 14,
          fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          glyphMargin: false,
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          renderLineHighlight: 'line',
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
          padding: { top: 12, bottom: 12 },
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          readOnly: readOnly,
          contextmenu: true,
          quickSuggestions: true,
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: 'on',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
        }}
      />
    </div>
  );
}
