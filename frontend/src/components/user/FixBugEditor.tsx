import { useRef, useEffect, useState } from 'react';

interface FixBugEditorProps {
  code: string;
  onChange: (value: string) => void;
  title?: string;
}

export default function FixBugEditor({ code, onChange }: FixBugEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    const lines = code.split('\n').length;
    setLineCount(Math.max(lines, 15));
  }, [code]);

  return (
    <div className="flex h-full font-mono text-sm bg-slate-950">
      {/* Line Numbers */}
      <div className="w-12 bg-slate-900/50 text-slate-600 text-right py-4 pr-3 select-none border-r border-slate-800/50">
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i} className="leading-6 text-xs">
            {i + 1}
          </div>
        ))}
      </div>
      
      {/* Code Editor */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full bg-transparent text-slate-300 p-4 resize-none focus:outline-none focus:ring-0 leading-6"
          spellCheck={false}
          placeholder="// Fix the bug in this code..."
          style={{ tabSize: 2 }}
        />
      </div>
    </div>
  );
}
