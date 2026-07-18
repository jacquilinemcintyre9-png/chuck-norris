import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fist, Folder, Star, Share2, Copy, Volume2, Trash2 } from 'lucide-react';
import { useJoke } from './hooks/useJoke';
import { useFavorites } from './hooks/useFavorites';
import JokeCard from './components/JokeCard';

const CATEGORIES = [
  { id: 'dev', icon: '💻', name: 'IT' },
  { id: 'sport', icon: '⚽', name: 'Спорт' },
  { id: 'food', icon: '🍔', name: 'Еда' },
  { id: 'music', icon: '🎵', name: 'Музыка' },
  { id: 'movie', icon: '🎬', name: 'Кино' },
  { id: 'animal', icon: '🐾', name: 'Животные' },
];

export default function App() {
  const [activeTab, setActiveTab] = React.useState('jokes');
  const { joke, isLoading, fetchJoke } = useJoke();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => { if (!joke) fetchJoke(); }, [joke, fetchJoke]);

  const handleAction = useCallback((action) => {
    if (!joke) return;
    if (action === 'copy') navigator.clipboard.writeText(joke.value);
    if (action === 'speak' && 'speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(joke.value);
      utter.lang = 'ru-RU';
      speechSynthesis.speak(utter);
    }
    if (action === 'share' && navigator.share) {
      navigator.share({ title: 'Чак Норрис', text: joke.value });
    }
  }, [joke]);

  const renderContent = () => {
    switch (activeTab) {
      case 'jokes':
        return (
          <div className="flex flex-col items-center gap-6 pt-6 px-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-amber-600 to-amber-400 shadow-[0_0_25px_rgba(212,175,55,0.3)]"
            >
              <img 
                src="https://api.chucknorris.io/img/avatar/chuck-norris.png" 
                alt="Chuck" 
                className="w-full h-full rounded-full object-cover border-2 border-black"
              />
            </motion.div>
            <JokeCard joke={joke} isLoading={isLoading} />
            
            <div className="w-full max-w-sm flex flex-col gap-3 mt-4">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => fetchJoke()}
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-red-900 to-red-950 text-white font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-red-900/40 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Fist className="w-5 h-5" /> Новая шутка
              </motion.button>
              
              <div className="flex justify-center gap-4">
                {[
                  { id: 'save', icon: Star, active: isFavorite(joke?.value), action: () => addFavorite(joke) },
                  { id: 'share', icon: Share2, action: () => handleAction('share') },
                  { id: 'speak', icon: Volume2, action: () => handleAction('speak') },
                  { id: 'copy', icon: Copy, action: () => handleAction('copy') },
                ].map(btn => (
                  <motion.button
                    key={btn.id}
                    whileTap={{ scale: 0.9 }}
                    onClick={btn.action}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                      btn.active 
                        ? 'bg-amber-500 border-amber-500 text-black' 
                        : 'bg-neutral-900 border-amber-500/30 text-amber-500 hover:bg-red-900 hover:border-amber-500'
                    }`}
                  >
                    <btn.icon className="w-5 h-5" fill={btn.active ? "currentColor" : "none"} />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'categories':
        return (
          <div className="p-4 grid grid-cols-3 gap-3 pt-6">
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.92 }}
                onClick={() => { fetchJoke(cat.id); setActiveTab('jokes'); }}
                className="aspect-square bg-neutral-900 border border-amber-500/15 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-lg active:bg-red-900 active:border-amber-500 transition-colors"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        );
      case 'favorites':
        return (
          <div className="p-4 flex flex-col gap-3 pt-6 pb-24">
            <AnimatePresence>
              {favorites.length === 0 ? (
                <p className="text-center text-neutral-500 mt-10">Пока нет сохраненных шуток</p>
              ) : (
                favorites.map((fav, idx) => (
                  <motion.div
                    key={fav.id || idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    className="bg-neutral-900 border border-amber-500/10 rounded-xl p-4 flex gap-3 items-start"
                  >
                    <p className="text-sm text-neutral-200 flex-1 leading-snug">{fav.value}</p>
                    <button 
                      onClick={() => removeFavorite(fav.value)}
                      className="text-neutral-500 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-amber-500/30">
      {/* Header */}
      <header className="bg-gradient-to-b from-red-900 to-red-950 p-4 pb-6 text-center relative shadow-lg shadow-red-900/30">
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        <h1 className="text-2xl font-black text-white uppercase tracking-[0.2em] drop-shadow-md">Чак Норрис</h1>
        <p className="text-[10px] text-amber-400 uppercase tracking-[0.3em] mt-1">Легендарные шутки</p>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto min-h-[calc(100vh-140px)]">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-neutral-950 border-t border-amber-500/20 backdrop-blur-lg z-50">
        <div className="max-w-md mx-auto flex justify-around items-center h-16">
          {[
            { id: 'jokes', icon: Fist, label: 'Шутки' },
            { id: 'categories', icon: Folder, label: 'Категории' },
            { id: 'favorites', icon: Star, label: 'Избранное' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all w-20 ${
                activeTab === tab.id ? 'text-amber-500 bg-red-900/30' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'fill-amber-500/20' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}