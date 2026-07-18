import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 32px 24px;
  width: 100%;
  max-width: 340px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  position: relative;
  text-align: center;
`;

const Quote = styled.span`
  font-size: 40px;
  position: absolute;
  opacity: 0.08;
  line-height: 1;
  color: #D4AF37;
  font-family: 'Georgia', serif;
  top: 4px;
  left: 16px;
`;

const QuoteBottom = styled(Quote)`
  top: auto;
  bottom: 4px;
  right: 16px;
  left: auto;
  transform: rotate(180deg);
`;

const Text = styled(motion.p)`
  font-size: 18px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.95);
  padding: 12px 0;
  font-weight: 400;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
`;

const Meta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const Tag = styled.span`
  font-size: 10px;
  color: #D4AF37;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-family: 'Oswald', sans-serif;
  opacity: 0.5;
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  background: #D4AF37;
  border-radius: 50%;
  opacity: 0.3;
`;

// Функция для перевода текста через встроенный API браузера
const translateText = async (text, targetLang = 'ru') => {
  try {
    // Используем встроенный переводчик браузера (если доступен)
    if ('ai' in window && window.ai.translator) {
      const translator = await window.ai.translator.create({
        sourceLanguage: 'en',
        targetLanguage: targetLang,
      });
      return await translator.translate(text);
    }
    
    // Fallback: используем Google Translate API (бесплатный, но с ограничениями)
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await response.json();
    return data[0][0][0];
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Возвращаем оригинал, если перевод не удался
  }
};

export const JokeCard = React.memo(({ joke, loading }) => {
  const [translatedJoke, setTranslatedJoke] = useState(joke);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if (!joke) return;
    
    const translate = async () => {
      setIsTranslating(true);
      const result = await translateText(joke);
      setTranslatedJoke(result);
      setIsTranslating(false);
    };
    
    translate();
  }, [joke]);

  const displayText = isTranslating ? 'Перевод...' : translatedJoke || joke;

  return (
    <AnimatePresence mode="wait">
      <Card
        key={joke}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Quote>❝</Quote>
        <QuoteBottom>❞</QuoteBottom>
        <Text
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          {loading ? 'Загрузка...' : displayText}
        </Text>
        <Meta>
          <Tag>ФАКТ</Tag>
          <Dot />
          <Tag>#ЧАКНОРРИС</Tag>
        </Meta>
      </Card>
    </AnimatePresence>
  );
});