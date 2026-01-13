import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { MaterialContent } from '@/mocks/levelMockData';

interface MaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  materialContent: MaterialContent;
}

export default function MaterialModal({ isOpen, onClose, materialContent }: MaterialModalProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // Reset section index when modal closes
  const handleClose = () => {
    setCurrentSectionIndex(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <Card className="w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 border-slate-800 bg-slate-900 text-slate-100">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800 bg-slate-900 pb-4 shrink-0">
          <div>
            <Badge variant="outline" className="mb-2 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
              Materi Pembelajaran {currentSectionIndex + 1} / {materialContent.sections.length}
            </Badge>
            <CardTitle className="text-xl text-white">
              {materialContent.sections[currentSectionIndex].heading}
            </CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleClose} 
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
          <div className="prose prose-invert max-w-none prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800">
            <ReactMarkdown
              components={{
                code(props) {
                  const {children, className, node, ref, ...rest} = props
                  const match = /language-(\w+)/.exec(className || '')
                  return match ? (
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      children={String(children).replace(/\n$/, '')}
                      language={match[1]}
                      style={atomDark}
                      className="rounded-md !bg-slate-950 !p-4 !m-0"
                    />
                  ) : (
                    <code {...rest} className={cn("bg-slate-800 px-1.5 py-0.5 rounded text-sm text-indigo-300 font-mono", className)}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {materialContent.sections[currentSectionIndex].content}
            </ReactMarkdown>
          </div>
        </CardContent>

        <div className="p-4 border-t border-slate-800 bg-slate-900 shrink-0 flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => setCurrentSectionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentSectionIndex === 0}
            className="border-slate-700 hover:bg-slate-800 text-slate-300"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Sebelumnya
          </Button>

          <div className="flex gap-1">
            {materialContent.sections.map((_, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300", 
                  idx === currentSectionIndex ? "w-8 bg-indigo-500" : "w-1.5 bg-slate-700"
                )}
              />
            ))}
          </div>

          {currentSectionIndex < materialContent.sections.length - 1 ? (
            <Button 
              onClick={() => setCurrentSectionIndex(prev => Math.min(materialContent.sections.length - 1, prev + 1))}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Selanjutnya <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={handleClose}
            >
              Selesai Belajar <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
