import { Code2 } from 'lucide-react';

interface CodingEditorProps {
  code: string;
  onChange: (value: string) => void;
  title?: string;
}

export default function CodingEditor({ code, onChange, title = "index.html" }: CodingEditorProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-slate-950 text-xs text-slate-400 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
        <span className="flex items-center gap-2">
          <Code2 size={14} className="text-indigo-400"/>
          {title}
        </span>
        <span className="text-slate-600">Code Editor</span>
      </div>
      <div className="flex-1 relative font-mono text-sm bg-slate-950">
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full bg-transparent text-slate-300 p-4 resize-none focus:outline-none focus:ring-0 leading-relaxed z-10"
          spellCheck={false}
          placeholder="// Tulis kode HTML kamu di sini..."
        />
      </div>
    </div>
  );
}
