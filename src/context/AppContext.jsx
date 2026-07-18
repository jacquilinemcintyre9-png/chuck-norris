import React, { createContext, useReducer, useContext, useEffect } from 'react';

const initialState = {
  joke: null,
  loading: false,
  favorites: JSON.parse(localStorage.getItem('chuckFavorites') || '[]'),
  categories: [],
  currentCategory: '',
  photoIndex: 0,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_JOKE':
      return { ...state, joke: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_CATEGORY':
      return { ...state, currentCategory: action.payload };
    case 'NEXT_PHOTO':
      return { ...state, photoIndex: (state.photoIndex + 1) % 12 };
    case 'TOGGLE_FAVORITE': {
      const favs = state.favorites.includes(action.payload)
        ? state.favorites.filter((j) => j !== action.payload)
        : [...state.favorites, action.payload];
      localStorage.setItem('chuckFavorites', JSON.stringify(favs));
      return { ...state, favorites: favs };
    }
    default:
      return state;
  }
}

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    fetch('https://api.chucknorris.io/jokes/categories')
      .then((r) => r.json())
      .then((data) => dispatch({ type: 'SET_CATEGORIES', payload: data }))
      .catch(() => {});
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}