import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import Editor from '@monaco-editor/react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Loader2, Maximize2, Minimize2 } from 'lucide-react';
import { runPhpCode, runSqlCode } from '@/services/user/ChallengeService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function InteractiveCodeBlockComponent({ node, updateAttributes, editor }: NodeViewProps) {
  const language = node.attrs.language || 'php';
  const initialCode = node.attrs.codeContent || '';
  
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const isEditable = editor.isEditable; // True if Lecturer, False if Student
  
  // To keep local state in sync if TipTap history undo/redo changes it
  useEffect(() => {
    if (isEditable && node.attrs.codeContent !== code) {
      setCode(node.attrs.codeContent);
    }
  }, [node.attrs.codeContent, isEditable, code]);

  const handleLanguageChange = (val: string) => {
    updateAttributes({ language: val });
    let defaultCode = '';
    if (val === 'php') defaultCode = '<?php\n\n?>';
    else if (val === 'html') defaultCode = '<!DOCTYPE html>\n<html>\n<head>\n  <title>Playground</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>';
    else if (val === 'javascript') defaultCode = 'console.log("Hello World");';
    else if (val === 'css') defaultCode = 'body {\n  background-color: #000;\n  color: #fff;\n}';
    else if (val === 'sql') defaultCode = 'CREATE TABLE test (id INTEGER, name TEXT);\nINSERT INTO test VALUES (1, "Hello");\nSELECT * FROM test;';
    
    setCode(defaultCode);
    updateAttributes({ codeContent: defaultCode });
    setOutput('');
  };

  const handleCodeChange = (val: string | undefined) => {
    const newVal = val || '';
    setCode(newVal);
    if (isEditable) {
      updateAttributes({ codeContent: newVal });
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    try {
      if (language === 'php') {
        const res = await runPhpCode({ php: code });
        if (res.success) {
          setOutput(res.data?.stdout || res.data?.stderr || 'Code executed successfully with no output.');
        } else {
          setOutput(res.data?.stderr || res.message || 'Error executing code');
        }
      } else if (language === 'sql') {
        const res = await runSqlCode(code);
        if (res.success) {
          if (res.data?.type === 'select') {
            // const cols = res.data.columns || [];
            const rows = res.data.rows || [];
            if (rows.length === 0) {
               setOutput('0 rows returned.');
            } else {
               setOutput(JSON.stringify(rows, null, 2));
            }
          } else {
            setOutput(res.data?.message || 'Query executed successfully.');
          }
        } else {
          setOutput(res.message || 'Error executing query');
        }
      } else if (['html', 'css', 'javascript'].includes(language)) {
        if (iframeRef.current) {
           let srcDoc = '';
           if (language === 'html') {
             srcDoc = code;
           } else if (language === 'javascript') {
             srcDoc = `<html><body><script>${code}<\/script></body></html>`;
           } else if (language === 'css') {
             srcDoc = `<html><head><style>${code}</style></head><body><h1>Preview</h1></body></html>`;
           }
           iframeRef.current.srcdoc = srcDoc;
           setOutput('Rendering in preview panel...');
        }
      }
    } catch (err: any) {
      setOutput(err.message || 'An error occurred');
    } finally {
      setIsRunning(false);
    }
  };

  const isBrowserLang = ['html', 'css', 'javascript'].includes(language);

  return (
    <NodeViewWrapper className={`interactive-code-block my-6 border border-slate-700 rounded-xl overflow-hidden bg-slate-900 flex flex-col ${isFullscreen ? 'fixed inset-4 z-[100] shadow-2xl' : 'relative h-[500px]'}`}>
      <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-slate-700 shrink-0">
        <div className="flex items-center gap-3">
          {isEditable ? (
             <Select value={language} onValueChange={handleLanguageChange}>
               <SelectTrigger className="h-7 w-[120px] text-xs bg-slate-900 border-slate-700 text-slate-200">
                 <SelectValue placeholder="Language" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="php">PHP</SelectItem>
                 <SelectItem value="sql">SQL</SelectItem>
                 <SelectItem value="html">HTML</SelectItem>
                 <SelectItem value="javascript">JavaScript</SelectItem>
                 <SelectItem value="css">CSS</SelectItem>
               </SelectContent>
             </Select>
          ) : (
            <span className="text-xs font-mono text-slate-400 font-semibold px-2 py-1 bg-slate-900 rounded-md border border-slate-700 uppercase">
              {language}
            </span>
          )}
          <span className="text-xs text-slate-500 hidden sm:inline-block">Interactive Code Block</span>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-white" onClick={() => setIsFullscreen(!isFullscreen)}>
             {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button type="button" size="sm" onClick={runCode} disabled={isRunning} className="bg-indigo-600 hover:bg-indigo-700 text-white h-7 text-xs px-4">
            {isRunning ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Play className="h-3 w-3 mr-1" />} Run
          </Button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Editor Pane */}
        <div className={`flex-1 min-h-[200px] ${isBrowserLang ? 'md:border-r border-slate-700' : ''}`}>
          <Editor
            height="100%"
            language={language === 'html' ? 'html' : language === 'css' ? 'css' : language === 'javascript' ? 'javascript' : language === 'sql' ? 'sql' : 'php'}
            theme="vs-dark"
            value={code}
            onChange={handleCodeChange}
            options={{ 
              minimap: { enabled: false }, 
              fontSize: 14, 
              lineNumbers: 'on', 
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              padding: { top: 16 }
            }}
          />
        </div>
        
        {/* Output Pane */}
        <div className={`flex flex-col bg-black ${isBrowserLang ? 'flex-1 md:h-full h-1/2' : 'h-[150px] shrink-0 border-t border-slate-700'}`}>
          <div className="px-3 py-1 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400 font-mono uppercase tracking-wider">
             {isBrowserLang ? 'Preview' : 'Console Output'}
          </div>
          <div className="flex-1 overflow-auto relative">
             {isBrowserLang ? (
               <iframe 
                 ref={iframeRef}
                 className="w-full h-full bg-white border-0" 
                 title="preview"
                 sandbox="allow-scripts"
               />
             ) : (
               <pre className="text-emerald-400 whitespace-pre-wrap p-4 font-mono text-sm">
                 {output || 'No output'}
               </pre>
             )}
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
}
