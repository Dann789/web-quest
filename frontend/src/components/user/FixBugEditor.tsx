import { Bug } from 'lucide-react';

interface FixBugEditorProps {
  code: string;
  onChange: (value: string) => void;
  title?: string;
}

export default function FixBugEditor({ code, onChange, title = "buggy-code.html" }: FixBugEditorProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-slate-950 text-xs text-slate-400 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
        <span className="flex items-center gap-2">
          <Bug size={14} className="text-red-400"/>
          {title}
        </span>
        <span className="text-red-400 font-semibold">⚠️ Fix the Bug</span>
      </div>
      <div className="flex-1 relative font-mono text-sm bg-slate-950">
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full bg-transparent text-slate-300 p-4 resize-none focus:outline-none focus:ring-0 leading-relaxed z-10"
          spellCheck={false}
          placeholder="// Perbaiki kode yang error di sini..."
        />
      </div>
    </div>
  );
}
