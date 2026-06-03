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
  const initialHtml = node.attrs.htmlContent || '<!DOCTYPE html>\n<html>\n<head>\n  <title>Playground</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>';
  const initialCss = node.attrs.cssContent || 'body {\n  font-family: sans-serif;\n}';
  
  const [code, setCode] = useState(initialCode);
  const [htmlCode, setHtmlCode] = useState(initialHtml);
  const [cssCode, setCssCode] = useState(initialCss);
  const [activeTab, setActiveTab] = useState<'code' | 'html' | 'css'>('code');
  
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const isEditable = editor.isEditable; // True if Lecturer, False if Student
  
  // To keep local state in sync if TipTap history undo/redo changes it
  useEffect(() => {
    if (isEditable) {
      if (node.attrs.codeContent !== undefined && node.attrs.codeContent !== code) {
        setCode(node.attrs.codeContent);
      }
      if (node.attrs.htmlContent !== undefined && node.attrs.htmlContent !== htmlCode) {
        setHtmlCode(node.attrs.htmlContent);
      }
      if (node.attrs.cssContent !== undefined && node.attrs.cssContent !== cssCode) {
        setCssCode(node.attrs.cssContent);
      }
    }
  }, [node.attrs.codeContent, node.attrs.htmlContent, node.attrs.cssContent, isEditable]);

  const handleLanguageChange = (val: string) => {
    updateAttributes({ language: val });
    let defaultCode = '';
    let defaultHtml = '<!DOCTYPE html>\n<html>\n<head>\n  <title>Playground</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>';
    let defaultCss = 'body {\n  background-color: #000;\n  color: #fff;\n}';
    
    if (val === 'php') defaultCode = '<?php\n\n?>';
    else if (val === 'html') defaultCode = defaultHtml;
    else if (val === 'javascript') defaultCode = 'console.log("Hello World");';
    else if (val === 'css') defaultCode = defaultCss;
    else if (val === 'sql') defaultCode = 'CREATE TABLE test (id INTEGER, name TEXT);\nINSERT INTO test VALUES (1, "Hello");\nSELECT * FROM test;';
    
    setCode(defaultCode);
    setHtmlCode(defaultHtml);
    setCssCode(defaultCss);
    
    updateAttributes({ 
      codeContent: defaultCode,
      htmlContent: defaultHtml,
      cssContent: defaultCss
    });
    
    setOutput('');
    
    // Set default active tab based on language
    if (val === 'javascript') setActiveTab('code'); // script.js
    else if (val === 'css') setActiveTab('code'); // styles.css
    else setActiveTab('code'); // main editor
  };

  const handleCodeChange = (val: string | undefined) => {
    const newVal = val || '';
    if (activeTab === 'code') {
      setCode(newVal);
      if (isEditable) updateAttributes({ codeContent: newVal });
    } else if (activeTab === 'html') {
      setHtmlCode(newVal);
      if (isEditable) updateAttributes({ htmlContent: newVal });
    } else if (activeTab === 'css') {
      setCssCode(newVal);
      if (isEditable) updateAttributes({ cssContent: newVal });
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
           } else if (language === 'css') {
             const baseHtml = htmlCode || '<!DOCTYPE html><html><head></head><body></body></html>';
             if (baseHtml.includes('</head>')) {
               srcDoc = baseHtml.replace('</head>', `<style>${code}</style></head>`);
             } else {
               srcDoc = baseHtml + `<style>${code}</style>`;
             }
           } else if (language === 'javascript') {
             const baseHtml = htmlCode || '<!DOCTYPE html><html><head></head><body></body></html>';
             let withCss = baseHtml;
             if (cssCode) {
               if (withCss.includes('</head>')) {
                 withCss = withCss.replace('</head>', `<style>${cssCode}</style></head>`);
               } else {
                 withCss += `<style>${cssCode}</style>`;
               }
             }
             
             if (withCss.includes('</body>')) {
               srcDoc = withCss.replace('</body>', `<script>${code}</script></body>`);
             } else {
               srcDoc = withCss + `<script>${code}</script>`;
             }
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
    <NodeViewWrapper className={`interactive-code-block my-6 border border-slate-700 rounded-xl overflow-hidden bg-slate-900 flex flex-col ${isFullscreen ? 'fixed inset-4 z-100 shadow-2xl' : 'relative h-[500px]'}`}>
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
      
      <div className={`flex-1 flex ${isBrowserLang ? 'flex-col md:flex-row' : 'flex-col'} overflow-hidden`}>
        {/* Editor Pane */}
        <div className={`flex-1 flex flex-col min-h-[200px] ${isBrowserLang ? 'md:border-r border-slate-700' : ''}`}>
          {isBrowserLang && language !== 'html' && (
            <div className="flex border-b border-slate-700 bg-slate-800">
              <button
                type="button"
                className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${activeTab === 'html' ? 'border-indigo-500 text-indigo-400 bg-slate-800/50' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
                onClick={() => setActiveTab('html')}
              >
                index.html
              </button>
              {(language === 'css' || language === 'javascript') && (
                <button
                  type="button"
                  className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${activeTab === (language === 'css' ? 'code' : 'css') ? 'border-indigo-500 text-indigo-400 bg-slate-800/50' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
                  onClick={() => setActiveTab(language === 'css' ? 'code' : 'css')}
                >
                  styles.css
                </button>
              )}
              {language === 'javascript' && (
                <button
                  type="button"
                  className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${activeTab === 'code' ? 'border-indigo-500 text-indigo-400 bg-slate-800/50' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
                  onClick={() => setActiveTab('code')}
                >
                  script.js
                </button>
              )}
            </div>
          )}
          <div className="flex-1 relative">
            <Editor
              height="100%"
              language={
                activeTab === 'html' ? 'html' :
                activeTab === 'css' ? 'css' :
                (activeTab === 'code' && language === 'javascript') ? 'javascript' :
                (activeTab === 'code' && language === 'css') ? 'css' :
                (activeTab === 'code' && language === 'html') ? 'html' :
                language === 'sql' ? 'sql' : 'php'
              }
              theme="vs-dark"
              value={activeTab === 'html' ? htmlCode : activeTab === 'css' ? cssCode : code}
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
        </div>
        
        {/* Output Pane */}
        <div className={`flex flex-col bg-black ${isBrowserLang ? 'flex-1 md:h-full h-1/2' : 'h-[250px] shrink-0 border-t border-slate-700'}`}>
          <div className="px-3 py-1 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400 font-mono uppercase tracking-wider">
             {isBrowserLang ? 'Preview' : 'Console Output'}
          </div>
          <div className="flex-1 overflow-auto relative">
             {isBrowserLang ? (
               <iframe 
                 ref={iframeRef}
                 className="w-full h-full bg-white border-0" 
                 title="preview"
                 sandbox="allow-scripts allow-forms"
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
