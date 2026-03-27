import { useState } from 'react';
import { GripVertical, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DragItem } from '@/types';

interface DragDropEditorProps {
  sourceItems: DragItem[];
  targetItems: DragItem[];
  onItemsChange: (source: DragItem[], target: DragItem[]) => void;
  isCorrect?: boolean;
  // errorMessage?: string | null;
}

export default function DragDropEditor({ 
  sourceItems, 
  targetItems, 
  onItemsChange, 
  isCorrect, 
  // errorMessage,
}: DragDropEditorProps) {
  const [draggedItem, setDraggedItem] = useState<{ item: DragItem, source: 'source' | 'target' } | null>(null);

  const handleDragStart = (e: React.DragEvent, item: DragItem, source: 'source' | 'target') => {
    setDraggedItem({ item, source });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify(item));
  };

  const handleDrop = (e: React.DragEvent, targetArea: 'source' | 'target', index?: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    // Create copies
    const newSource = [...sourceItems];
    const newTarget = [...targetItems];

    // Remove from old location
    if (draggedItem.source === 'source') {
      const idx = newSource.findIndex(i => i.id === draggedItem.item.id);
      if (idx !== -1) newSource.splice(idx, 1);
    } else {
      const idx = newTarget.findIndex(i => i.id === draggedItem.item.id);
      if (idx !== -1) newTarget.splice(idx, 1);
    }

    // Add to new location
    if (targetArea === 'source') {
      // Add back to source
      newSource.push(draggedItem.item);
    } else {
      // Add to target
      if (typeof index === 'number') {
        newTarget.splice(index, 0, draggedItem.item);
      } else {
        newTarget.push(draggedItem.item);
      }
    }

    onItemsChange(newSource, newTarget);
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 p-6 overflow-y-auto">
      {/* Main Drag Drop Area */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 flex-1 min-h-0">
        
        {/* Source Area */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-600" />
              Blok kode yang tersedia
            </h3>
            <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
              {sourceItems.length} items
            </span>
          </div>
          
          <div 
            className={cn(
              "flex-1 bg-slate-900/30 rounded-xl border border-dashed border-slate-800 p-4 transition-colors min-h-[150px] overflow-y-auto",
              draggedItem?.source === 'target' && "border-indigo-500/30 bg-indigo-500/5"
            )}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'source')}
          >
            <div className="flex flex-wrap gap-2 content-start">
              {sourceItems.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, 'source')}
                  className="bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-md border border-slate-700 cursor-grab active:cursor-grabbing hover:border-indigo-500/50 hover:shadow-lg transition-all group shrink-0"
                >
                  <code className="text-sm font-mono text-indigo-300 select-none pointer-events-none">{item.content}</code>
                </div>
              ))}
              {sourceItems.length === 0 && (
                <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs py-8 select-none">
                  Semua Block sudah digunakan
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Target/Assembly Area */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                Solusi Anda
              </h3>
              {isCorrect && (
                <span className="text-[10px] text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  Benar <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"/>
                </span>
              )}
          </div>
          
          <div 
            className={cn(
              "flex-1 bg-[#1e1e1e] rounded-xl border-2 border-slate-800 p-0 overflow-hidden relative min-h-[150px] flex flex-col",
              draggedItem && "border-indigo-500/50",
              isCorrect && "border-emerald-500/50 shadow-[0_0_15px_-5px_rgba(16,185,129,0.2)]"
            )}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'target')}
          >
             {/* Fake VS Code Header */}
             <div className="h-8 bg-[#2d2d2d] flex items-center px-4 border-b border-[#3e3e3e] shrink-0">
               <span className="text-[10px] text-slate-400 font-mono">solution.html</span>
             </div>

             <div className="flex-1 p-2 overflow-y-auto max-h-[30rem] relative [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#1e1e1e] [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-[#1e1e1e] hover:[&::-webkit-scrollbar-thumb]:bg-slate-600">
                <div className="flex flex-col gap-0.5 min-h-full">
                  {targetItems.length === 0 && !draggedItem && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 pointer-events-none select-none p-4 text-center">
                        <Code2 className="mb-2 opacity-20" size={32}/>
                        <span className="text-sm">Drag code blocks here to build your solution</span>
                    </div>
                  )}
                  
                  {targetItems.map((item, index) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item, 'target')}
                      onDrop={(e) => {
                        e.stopPropagation(); 
                        handleDrop(e, 'target', index);
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      className={cn(
                        "flex items-center group relative -mx-2 px-2 py-1 rounded hover:bg-[#2a2d2e] border border-transparent hover:border-[#3e3e3e] transition-all",
                        isCorrect && "hover:bg-transparent hover:border-transparent" // Disable hover effect when locked/correct if desired
                      )}
                    >
                      {/* Line Number */}
                      <span className="text-xs text-slate-600 font-mono w-6 text-right mr-4 select-none shrink-0">{index + 1}</span>
                      
                      {/* Content */}
                      <div className="flex-1 flex items-center gap-2 overflow-hidden">
                        <code className="text-sm font-mono text-[#9cdcfe] whitespace-pre truncate">{item.content}</code>
                      </div>

                      {/* Drag Handle (Hidden when correct or always visible on hover) */}
                      {!isCorrect && (
                         <div className="opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing text-slate-500 px-2 transition-opacity">
                            <GripVertical size={14} />
                         </div>
                      )}
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Live Preview section removed - now handled by ChallengePage PreviewPanel */}
    </div>
  );
}
