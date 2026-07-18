import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Loader2 } from 'lucide-react';

const JokeCard = memo(({ joke, isLoading }) => {
  return (
    <div className="relative w-full max-w-sm mx-auto perspective-1000">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-neutral-900/90 backdrop-blur-md border border-amber-500/20 rounded-3xl p-8 shadow-2xl flex items-center justify-center min-h-[200px]"
          >
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          </motion.div>
        ) : joke ? (
          <motion.div
            key={joke.id || joke.value}
            initial={{ opacity: 0, y: 20, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20, rotateX: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-gradient-to-br from-neutral-900 to-black border border-amber-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-800 to-transparent" />
            
            <Quote className="absolute top-4 left-4 w-8 h-8 text-amber-500/30" />
            <Quote className="absolute bottom-4 right-4 w-8 h-8 text-red-800/30 rotate-180" />
            
            <p className="text-neutral-100 text-lg leading-relaxed text-center font-medium relative z-10 pt-4">
              {joke.value}
            </p>
            
            <div className="mt-6 pt-4 border-t border-amber-500/10 flex items-center justify-center gap-2">
              <span className="text-xs font-bold text-amber-500/70 uppercase tracking-widest">
                {joke.categories?.[0] || 'Факт'}
              </span>
              <div className="w-1 h-1 rounded-full bg-red-800" />
              <span className="text-xs font-bold text-amber-500/70 uppercase tracking-widest">#ЧакНоррис</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
});

export default JokeCard;