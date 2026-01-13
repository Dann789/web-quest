import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { LayoutTemplate } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Challenge } from '@/mocks/levelMockData';

interface ScenarioViewerProps {
  challenge: Challenge;
  selectedOption?: string;
  onSelect: (id: string) => void;
}

export default function ScenarioViewer({ challenge, selectedOption, onSelect }: ScenarioViewerProps) {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Scenario Context */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            <LayoutTemplate className="text-indigo-400" size={20}/> 
            Konteks Skenario
          </h3>
          <p className="text-slate-300 leading-relaxed">
            {challenge.scenarioContext}
          </p>
        </div>

        {/* Question & Options */}
        <div className="space-y-4">
          <h4 className="font-medium text-slate-200 block">
            {challenge.scenarioQuestion}
          </h4>
          
          <RadioGroup value={selectedOption} onValueChange={onSelect} className="space-y-3">
            {challenge.scenarioOptions?.map((option) => (
              <div key={option.id} className={cn(
                "flex items-start space-x-3 space-y-0 rounded-lg border p-4 transition-all cursor-pointer",
                selectedOption === option.id 
                  ? "bg-indigo-950/30 border-indigo-500 ring-1 ring-indigo-500/50" 
                  : "bg-slate-900 border-slate-700 hover:bg-slate-800"
              )}>
                <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                <Label htmlFor={option.id} className="cursor-pointer flex-1">
                   <SyntaxHighlighter
                      language="html"
                      style={atomDark}
                      customStyle={{ background: 'transparent', padding: 0, margin: 0, fontSize: '0.9em' }}
                      wrapLongLines
                   >
                     {option.text}
                   </SyntaxHighlighter>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
