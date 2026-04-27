import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize, RotateCcw, Monitor, ChevronLeft } from 'lucide-react';

export default function GamePlayer({ game, onClose }) {
  const handleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  const handleRefresh = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  return (
    <AnimatePresence>
      {game && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#020617]/95 backdrop-blur-xl flex flex-col"
          id="game-player-overlay"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/10">
            <div className="flex items-center gap-6">
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-white group"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Back to Arcade</span>
              </button>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <h2 className="text-white font-black text-xl leading-none italic uppercase tracking-tighter">{game.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{game.category} Session</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className="p-2.5 hover:bg-white/10 rounded-xl transition-colors text-slate-400 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={handleFullscreen}
                className="p-3 bg-white text-slate-900 hover:bg-slate-200 rounded-xl transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest shadow-xl shadow-white/5"
              >
                <Maximize className="w-4 h-4" />
                <span className="hidden sm:inline">Immerse</span>
              </button>
              <button
                onClick={onClose}
                className="p-2.5 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-all text-slate-500 border border-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Iframe Viewport */}
          <div className="flex-1 relative bg-black flex items-center justify-center p-4">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
               <Monitor className="w-64 h-64 text-white" />
            </div>
            <div className="w-full h-full glass rounded-3xl overflow-hidden relative z-10 shadow-[0_0_100px_rgba(79,70,229,0.15)]">
              <iframe
                id="game-iframe"
                src={game.url}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Footer Info */}
          <div className="px-8 py-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
              <span className="text-slate-500">Metadata:</span>
              <div className="flex gap-2">
                {game.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 glass rounded text-indigo-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 opacity-50">
               <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
               <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Live Connection</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
