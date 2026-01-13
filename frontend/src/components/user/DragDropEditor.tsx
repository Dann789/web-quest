import { useState } from 'react';
import { GripVertical, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DragItem } from '@/mocks/levelMockData';

interface DragDropEditorProps {
  items: DragItem[];
  onReorder: (items: DragItem[]) => void;
}

export default function DragDropEditor({ items, onReorder }: DragDropEditorProps) {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);

  const handleDragStart = (e: React.DragEvent, item: DragItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (!draggedItem) return;
    
    const draggedIdx = items.findIndex(i => i.id === draggedItem.id);
    if (draggedIdx === index) return;

    const newItems = [...items];
    newItems.splice(draggedIdx, 1);
    newItems.splice(index, 0, draggedItem);
    
    onReorder(newItems);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="p-6 h-full bg-slate-900/50 flex flex-col justify-center items-center">
      <div className="space-y-3 w-full max-w-md">
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={cn(
              "flex items-center gap-3 bg-slate-800 p-4 rounded-lg border border-slate-700 cursor-move transition-all hover:border-indigo-500 hover:shadow-lg active:scale-[0.98]",
              draggedItem?.id === item.id && "opacity-50 border-dashed border-indigo-400"
            )}
          >
            <GripVertical className="text-slate-500" />
            <code className="text-indigo-300 font-mono bg-slate-900 px-2 py-1 rounded flex-1">
              {item.content}
            </code>
          </div>
        ))}
      </div>
      <p className="text-slate-500 text-sm mt-6 flex items-center gap-2">
        <Lightbulb size={14} /> Drag items to reorder them correctly
      </p>
    </div>
  );
}
