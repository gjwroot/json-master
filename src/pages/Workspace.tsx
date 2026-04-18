import { useState, useEffect } from 'react';
import { Terminal, Braces, FileJson, Copy, Check, Code, Hash, AlignLeft, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { parseJsonToAst, generateTypeScript, generateGo, generatePython } from '../utils/jsonParser';

function Workspace() {
  const [inputJson, setInputJson] = useState<string>('{\n  "name": "Trae SOLO",\n  "version": 1.0,\n  "features": ["Offline", "Fast", "Secure"],\n  "author": {\n    "name": "Developer",\n    "role": "Creator"\n  }\n}');
  const [parsedData, setParsedData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [targetLang, setTargetLang] = useState<'typescript' | 'go' | 'python'>('typescript');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const data = JSON.parse(inputJson);
      setParsedData(data);
      setErrorMsg(null);
      
      const ast = parseJsonToAst(data);
      let code = '';
      if (targetLang === 'typescript') code = generateTypeScript(ast);
      else if (targetLang === 'go') code = generateGo(ast);
      else if (targetLang === 'python') code = generatePython(ast);
      
      setGeneratedCode(code);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  }, [inputJson, targetLang]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatJson = () => {
    try {
      const data = JSON.parse(inputJson);
      setInputJson(JSON.stringify(data, null, 2));
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans flex flex-col">
      {/* Header */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-slate-400 hover:text-cyan-400 transition-colors p-2 hover:bg-slate-800 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-px h-6 bg-slate-800"></div>
          <div className="flex items-center gap-3">
            <Terminal className="text-cyan-400 w-6 h-6" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              JSON <span className="text-cyan-400">Master</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Column: Input */}
        <div className="w-1/3 flex flex-col border-r border-slate-800 bg-slate-900/50">
          <div className="h-12 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-900">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <FileJson className="w-4 h-4 text-slate-400" />
              Raw JSON
            </div>
            <button 
              onClick={formatJson}
              className="text-xs flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <AlignLeft className="w-3 h-3" />
              Format
            </button>
          </div>
          <div className="flex-1 relative">
            <textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              className="absolute inset-0 w-full h-full bg-transparent text-slate-300 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-inset focus:ring-cyan-500/50"
              spellCheck="false"
              placeholder="Paste your JSON here..."
            />
          </div>
          {/* Status Bar */}
          <div className={`h-8 border-t border-slate-800 flex items-center px-4 text-xs ${errorMsg ? 'bg-rose-950/30 text-rose-400' : 'bg-emerald-950/30 text-emerald-400'}`}>
            {errorMsg ? (
              <div className="flex items-center gap-2">
                <AlertCircle className="w-3 h-3" />
                Invalid JSON: {errorMsg}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3" />
                Valid JSON
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="w-2/3 flex flex-col">
          {/* Top Half: Tree View (Simulated) */}
          <div className="h-1/2 flex flex-col border-b border-slate-800 bg-slate-900/30">
            <div className="h-12 border-b border-slate-800 flex items-center px-4 bg-slate-900">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <Braces className="w-4 h-4 text-slate-400" />
                Tree View
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 font-mono text-sm">
              {parsedData ? (
                <pre 
                  className="text-slate-400"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(parsedData, null, 2)
                      .replace(/"([^"]+)":/g, '<span class="text-cyan-300">"$1"</span>:')
                      .replace(/: "([^"]+)"/g, ': <span class="text-emerald-300">"$1"</span>')
                      .replace(/: ([0-9.]+)/g, ': <span class="text-amber-300">$1</span>')
                      .replace(/: (true|false)/g, ': <span class="text-rose-300">$1</span>')
                  }}
                />
              ) : (
                <div className="text-slate-600 flex h-full items-center justify-center">
                  Waiting for valid JSON...
                </div>
              )}
            </div>
          </div>

          {/* Bottom Half: Code Generator */}
          <div className="h-1/2 flex flex-col bg-slate-950">
            <div className="h-12 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-900">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Code className="w-4 h-4 text-slate-400" />
                  Generated Types
                </div>
                <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
                  {(['typescript', 'go', 'python'] as const).map(lang => (
                    <button
                      key={lang}
                      onClick={() => setTargetLang(lang)}
                      className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
                        targetLang === lang 
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {lang === 'typescript' ? 'TypeScript' : lang}
                    </button>
                  ))}
                </div>
              </div>
              <button 
                onClick={handleCopy}
                disabled={!!errorMsg}
                className="flex items-center gap-2 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 text-white text-xs font-medium rounded-md transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 relative">
              {errorMsg ? (
                <div className="text-slate-600 flex h-full items-center justify-center font-mono text-sm">
                  Fix JSON errors to generate code
                </div>
              ) : (
                <pre className="font-mono text-sm text-slate-300">
                  <code>{generatedCode}</code>
                </pre>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Workspace;
