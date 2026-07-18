import { useState, useCallback } from 'react';

// 1. Описываем тип (интерфейс) нашей шутки
interface Joke {
  id?: string;
  value: string;
  categories: string[];
  translated?: string; // Добавил на случай, если вы будете добавлять перевод
}

const FALLBACK_JOKES = [
  'Чак Норрис считал до бесконечности. Дважды.',
  'Чак Норрис может делить на ноль.',
  'Чак Норрис не спит. Он ждёт.',
  'Чак Норрис может выжать апельсиновый сок из лимона.'
];

export function useJoke() {
  // 2. Указываем TypeScript, что joke может быть объектом Joke или null
  const [joke, setJoke] = useState<Joke | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJoke = useCallback(async (category = '') => {
    setIsLoading(true);
    try {
      const url = category 
        ? `https://api.chucknorris.io/jokes/random?category=${category}`
        : 'https://api.chucknorris.io/jokes/random';
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      
      // data уже соответствует структуре Joke (у API есть id, value, categories)
      setJoke(data);
    } catch (err) {
      const randomFallback = FALLBACK_JOKES[Math.floor(Math.random() * FALLBACK_JOKES.length)];
      // 3. Теперь TypeScript знает, что этот объект разрешен, так как он совпадает с интерфейсом Joke
      setJoke({ 
        value: randomFallback, 
        categories: ['legacy'],
        id: 'fallback-' + Date.now() // Добавляем временный id для совместимости
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { joke, isLoading, fetchJoke };
}