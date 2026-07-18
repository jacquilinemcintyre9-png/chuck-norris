import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Card = styled(motion.div)`
  padding: 16px 20px;
  text-align: center;
  max-width: 340px;
  width: 100%;
`;

const Text = styled(motion.p)`
  font-size: 22px;
  line-height: 1.6;
  color: #fff;
  font-weight: 300;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  letter-spacing: 0.5px;
`;

const Meta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const Tag = styled.span`
  font-size: 10px;
  color: #D4AF37;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-family: 'Oswald', sans-serif;
  opacity: 0.6;
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  background: #D4AF37;
  border-radius: 50%;
  opacity: 0.3;
`;

// Перевод через Google Translate API
const translateText = async (text) => {
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await response.json();
    return data[0][0][0];
  } catch {
    return text;
  }
};

export const JokeCard = React.memo(({ joke, loading }) => {
  const [translated, setTranslated] = useState(joke);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if (!joke) return;
    const doTranslate = async () => {
      setIsTranslating(true);
      const result = await translateText(joke);
      setTranslated(result);
      setIsTranslating(false);
    };
    doTranslate();
  }, [joke]);

  const display = isTranslating ? 'Перевод...' : translated || joke;

  return (
    <AnimatePresence mode="wait">
      <Card
        key={joke}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        <Text
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {loading ? 'Загрузка...' : display}
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