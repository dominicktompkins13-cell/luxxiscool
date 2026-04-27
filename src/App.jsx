import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Gamepad2, TrendingUp, Filter, Github, Zap, ShieldCheck } from 'lucide-react';
import gamesData from './data/games.json';
import GameCard from './components/GameCard.jsx';
import GamePlayer from './components/GamePlayer.jsx';

const CATEGORIES = ['All', 'Puzzle', 'Action', 'Casual', 'Classic', 'Sandbox'];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeGame, setActiveGame] = useState(null);

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (game.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ?? false);
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col md:flex-row p-4 md:p-6 gap-6">
      {/* Background Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blob pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blob pointer-events-none" />

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 glass rounded-[2rem] p-8 flex flex-col gap-8 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white uppercase italic">
            Play<span className="text-cyan-400">Box</span>
          </h1>
        </div>

        <div className="relative group w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/20 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-500/30 transition-all placeholder:text-slate-500"
            />
        </div>

        <nav className="flex flex-col gap-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-4 flex items-center gap-2">
            <Filter className="w-3 h-3" /> Categories
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-3 rounded-xl flex items-center gap-3 border transition-all text-sm font-medium ${
                selectedCategory === cat
                  ? 'bg-white/10 border-white/10 text-white'
                  : 'hover:bg-white/5 border-transparent text-slate-400'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${selectedCategory === cat ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'bg-slate-600'}`} />
              {cat}
            </button>
          ))}
        </nav>

        <div className="mt-auto bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4">
          <div className="text-sm font-medium text-indigo-300 flex items-center gap-2">
            <Zap className="w-3 h-3" /> System Status
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
            <span className="text-xs text-slate-300 font-medium">All realms active</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 z-10 w-full">
        <header className="h-20 glass rounded-3xl flex items-center px-8 justify-between shrink-0">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest leading-none mb-1">
              {filteredGames.length} Curated Titles
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
               Explore <span className="text-indigo-400 italic">Unblocked</span> Arcade
            </h2>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="hidden sm:flex items-center gap-2 text-slate-400 font-medium">
               <TrendingUp className="w-4 h-4 text-emerald-400" />
               142 Online
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-indigo-400 shadow-xl">
               PU
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
          {/* Featured Hero Area (Horizontal scroll or banner) */}
          {selectedCategory === 'All' && !searchQuery && (
            <div className="glass-card rounded-[2.5rem] p-10 relative overflow-hidden group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-transparent pointer-events-none"></div>
              <div className="relative flex flex-col justify-end min-h-[160px] md:min-h-[200px]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 mb-2 flex items-center gap-2">
                   <ShieldCheck className="w-3 h-3" /> Verified Safe
                </span>
                <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter leading-none italic uppercase">
                  Featured <span className="text-indigo-400">Releases</span>
                </h2>
                <p className="text-slate-300 max-w-sm mb-6 text-sm leading-relaxed">
                  High-speed, unblocked proxy support. New levels added weekly for your digital escape.
                </p>
                <div className="flex gap-4">
                  <button className="px-8 py-3 bg-white text-slate-900 font-black text-xs rounded-xl shadow-xl shadow-white/10 hover:scale-105 transition-transform">
                    LATEST DROPS
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Game Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 pb-20">
            <AnimatePresence mode="popLayout">
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    onClick={setActiveGame}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center text-slate-500 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/2"
                >
                  <Search className="w-12 h-12 mb-4 opacity-10" />
                  <p className="text-lg font-medium text-slate-300">No titles found in this realm.</p>
                  <button
                    onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                    className="mt-4 text-cyan-400 text-sm font-bold hover:underline"
                  >
                    Clear Search Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer info inside main */}
        <footer className="mt-auto px-4 py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
           <div className="flex gap-6">
             <a href="#" className="hover:text-indigo-400 transition-colors">Safety</a>
             <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
             <a href="#" className="hover:text-indigo-400 transition-colors">Legal</a>
           </div>
           <div className="flex items-center gap-4">
              <span>© 2026 PlayBox Media</span>
              <a href="#" className="p-2 glass rounded-lg hover:text-white transition-colors">
                <Github className="w-3 h-3" />
              </a>
           </div>
        </footer>
      </main>

      {/* Game Player Overlay */}
      <GamePlayer
        game={activeGame}
        onClose={() => setActiveGame(null)}
      />
    </div>
  );
}
