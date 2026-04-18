import { Link } from 'react-router-dom';
import { Terminal, ShieldCheck, Zap, Code2, ArrowRight, Github } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="text-cyan-400 w-6 h-6" />
            <span className="text-xl font-bold text-white tracking-wide">
              JSON <span className="text-cyan-400">Master</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/gjwroot/json-master" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">Star on GitHub</span>
            </a>
            <Link 
              to="/app" 
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-all shadow-[0_0_15px_rgba(8,145,178,0.3)] hover:shadow-[0_0_25px_rgba(8,145,178,0.5)]"
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-cyan-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              100% Offline & Secure
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              From Messy JSON to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Production Types
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              Stop manually writing Go Structs, TS Interfaces, and Python Models. 
              Paste your API payloads and instantly generate strongly-typed structures without your data ever leaving the browser.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/app" 
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-105"
              >
                Start Generating <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors"
              >
                View Features
              </button>
            </div>
          </div>

          {/* Code Showcase Demo */}
          <div className="relative mx-auto max-w-5xl rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-cyan-900/10">
            <div className="h-10 border-b border-slate-800 flex items-center px-4 gap-2 bg-slate-950">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <div className="flex flex-col md:flex-row h-[400px]">
              <div className="flex-1 border-r border-slate-800 p-6 font-mono text-sm overflow-hidden">
                <div className="text-slate-500 mb-4">// Input: Raw API Response</div>
                <pre className="text-slate-300">
                  <span className="text-slate-400">{'{'}</span><br/>
                  {'  '}<span className="text-cyan-300">"code"</span>: <span className="text-amber-300">200</span>,<br/>
                  {'  '}<span className="text-cyan-300">"message"</span>: <span className="text-emerald-300">"success"</span>,<br/>
                  {'  '}<span className="text-cyan-300">"data"</span>: <span className="text-slate-400">{'['}</span><br/>
                  {'    '}<span className="text-slate-400">{'{'}</span><br/>
                  {'      '}<span className="text-cyan-300">"id"</span>: <span className="text-amber-300">1001</span>,<br/>
                  {'      '}<span className="text-cyan-300">"username"</span>: <span className="text-emerald-300">"admin"</span>,<br/>
                  {'      '}<span className="text-cyan-300">"isActive"</span>: <span className="text-rose-300">true</span><br/>
                  {'    '}<span className="text-slate-400">{'}'}</span><br/>
                  {'  '}<span className="text-slate-400">{']'}</span><br/>
                  <span className="text-slate-400">{'}'}</span>
                </pre>
              </div>
              <div className="flex-1 p-6 font-mono text-sm bg-slate-950 overflow-hidden relative">
                <div className="absolute top-4 right-4 text-xs font-bold px-2 py-1 bg-cyan-900/50 text-cyan-400 rounded">Go</div>
                <div className="text-slate-500 mb-4">// Output: Auto-inferred Go Struct</div>
                <pre className="text-slate-300">
                  <span className="text-rose-400">type</span> <span className="text-amber-200">Root</span> <span className="text-rose-400">struct</span> {'{\n'}
                  {'    '}<span className="text-cyan-200">Code</span>    <span className="text-emerald-400">float64</span> <span className="text-amber-400">`json:"code"`</span><br/>
                  {'    '}<span className="text-cyan-200">Message</span> <span className="text-emerald-400">string</span>  <span className="text-amber-400">`json:"message"`</span><br/>
                  {'    '}<span className="text-cyan-200">Data</span>    []<span className="text-emerald-400">Data</span>   <span className="text-amber-400">`json:"data"`</span><br/>
                  {'}\n\n'}
                  <span className="text-rose-400">type</span> <span className="text-amber-200">Data</span> <span className="text-rose-400">struct</span> {'{\n'}
                  {'    '}<span className="text-cyan-200">Id</span>       <span className="text-emerald-400">float64</span> <span className="text-amber-400">`json:"id"`</span><br/>
                  {'    '}<span className="text-cyan-200">Username</span> <span className="text-emerald-400">string</span>  <span className="text-amber-400">`json:"username"`</span><br/>
                  {'    '}<span className="text-cyan-200">IsActive</span> <span className="text-emerald-400">bool</span>    <span className="text-amber-400">`json:"isActive"`</span><br/>
                  {'}'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 border-t border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Built for Backend & Full-stack Developers</h2>
            <p className="text-slate-400">Stop wasting time writing boilerplate. Let the AST engine do the heavy lifting.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Code2 className="text-blue-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Multi-Language Support</h3>
              <p className="text-slate-400 leading-relaxed">
                Natively infers Go Structs, TypeScript Interfaces, and Python Pydantic BaseModels. More languages coming soon.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <ShieldCheck className="text-emerald-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Privacy First</h3>
              <p className="text-slate-400 leading-relaxed">
                Zero server calls. The entire Abstract Syntax Tree (AST) parsing runs securely in your local browser memory.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6">
                <Zap className="text-amber-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
              <p className="text-slate-400 leading-relaxed">
                Written in pure TypeScript. Paste a 10,000-line JSON file and get formatted models instantly with zero lag.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>Created for TRAE × Maimai SOLO Challenge. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
