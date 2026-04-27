import { motion } from 'motion/react';
import { Play, Sparkles } from 'lucide-react';

export default function GameCard({ game, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative glass-card rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl transition-all hover:shadow-indigo-500/10"
      onClick={() => onClick(game)}
      id={`game-card-${game.id}`}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent group-hover:via-[#020617]/20 transition-all" />
        
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white text-slate-900 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Play Now
          </div>
        </div>

        <div className="absolute top-4 left-4 flex gap-2">
          <div className="px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-[9px] font-bold uppercase tracking-wider text-white">
            {game.category}
          </div>
        </div>
      </div>
      
      <div className="p-6 relative">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white font-bold text-lg leading-tight group-hover:text-indigo-400 transition-colors">{game.title}</h3>
          <div className="p-1.5 glass rounded-lg opacity-40 group-hover:opacity-100 transition-opacity">
            <Play className="w-3 h-3 text-white fill-current" />
          </div>
        </div>
        <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">{game.description}</p>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2].map((i) => (
              <div key={i} className="w-5 h-5 rounded-full border border-white/10 bg-slate-800 flex items-center justify-center">
                 <Sparkles className="w-2 h-2 text-cyan-400" />
              </div>
            ))}
          </div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            {game.tags[0]}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
