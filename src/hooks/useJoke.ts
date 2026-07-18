import { useCallback } from 'react';
import { useApp } from '../context/AppContext';

const FALLBACK_JOKES = [
  'Чак Норрис считал до бесконечности. Дважды.',
  'Чак Норрис может делить на ноль.',
  'Чак Норрис не спит. Он ждёт.',
  'Чак Норрис не читает книги. Он смотрит на них, пока они не выдают всю информацию.',
  'Чак Норрис может выжать апельсиновый сок из лимона.',
  'Чак Норрис может построить снеговика из дождя.',
  'Чак Норрис не отжимается. Он отталкивает Землю вниз.',
  'Чак Норрис может хлопнуть вращающуюся дверь.',
  'Чак Норрис не использует GPS. Места сами его находят.',
  'Новогодняя ёлка Чака Норриса: 100 метров высотой, 103 856 игрушек, 262 звезды и слишком много подарков, чтобы их сосчитать.',
];

export function useJoke() {
  const { state, dispatch } = useApp();

  const fetchJoke = useCallback(
    async (category = '') => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const url = category
          ? `https://api.chucknorris.io/jokes/random?category=${category}`
          : 'https://api.chucknorris.io/jokes/random';
        const res = await fetch(url);
        const data = await res.json();
        dispatch({ type: 'SET_JOKE', payload: data });
        dispatch({ type: 'NEXT_PHOTO' });
      } catch (e) {
        const fallback = FALLBACK_JOKES[Math.floor(Math.random() * FALLBACK_JOKES.length)];
        dispatch({ type: 'SET_JOKE', payload: { value: fallback } });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [dispatch]
  );

  return { fetchJoke, joke: state.joke, loading: state.loading };
}