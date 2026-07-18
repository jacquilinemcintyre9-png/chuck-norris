import { useState, useEffect, useCallback } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('chuckFavorites');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('chuckFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = useCallback((joke) => {
    setFavorites(prev => prev.some(f => f.value === joke.value) ? prev : [joke, ...prev]);
  }, []);

  const removeFavorite = useCallback((jokeValue) => {
    setFavorites(prev => prev.filter(f => f.value !== jokeValue));
  }, []);

  const isFavorite = useCallback((jokeValue) => {
    return favorites.some(f => f.value === jokeValue);
  }, [favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}