import React, { useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const Wrapper = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

const IconBtn = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid rgba(255, 0, 0, 0.2);
  background: rgba(10, 10, 15, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #ff0000;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  &:hover {
    background: rgba(255, 0, 0, 0.1);
    border-color: #ff0000;
    box-shadow: 0 0 30px rgba(255, 0, 0, 0.2);
    transform: translateY(-3px);
  }
  &:active {
    transform: scale(0.9);
    background: rgba(255, 0, 0, 0.2);
  }
`;

export const ActionButtons = React.memo(({ joke }) => {
  const { state, dispatch } = useApp();

  const handleSave = useCallback(() => {
    if (joke && !state.favorites.includes(joke.value)) {
      dispatch({ type: 'TOGGLE_FAVORITE', payload: joke.value });
    }
  }, [joke, state.favorites, dispatch]);

  const handleShare = useCallback(() => {
    if (navigator.share && joke) {
      navigator.share({ title: 'Чак Норрис', text: joke.value });
    } else if (joke) {
      alert(joke.value);
    }
  }, [joke]);

  const handleSpeak = useCallback(() => {
    if ('speechSynthesis' in window && joke) {
      const utter = new SpeechSynthesisUtterance(joke.value);
      utter.lang = 'ru-RU';
      speechSynthesis.speak(utter);
    }
  }, [joke]);

  const handleCopy = useCallback(() => {
    if (joke) {
      navigator.clipboard.writeText(joke.value).then(() => alert('Скопировано! 📋'));
    }
  }, [joke]);

  return (
    <Wrapper>
      <IconBtn
        onClick={handleSave}
        title="В избранное"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ⭐
      </IconBtn>
      <IconBtn
        onClick={handleShare}
        title="Поделиться"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        📤
      </IconBtn>
      <IconBtn
        onClick={handleSpeak}
        title="Озвучить"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊
      </IconBtn>
      <IconBtn
        onClick={handleCopy}
        title="Копировать"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        📋
      </IconBtn>
    </Wrapper>
  );
});