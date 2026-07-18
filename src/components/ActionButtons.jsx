import React, { useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const Wrapper = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

const IconBtn = styled(motion.button)`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  color: #888;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(212, 175, 55, 0.05);
    border-color: rgba(212, 175, 55, 0.2);
    color: #D4AF37;
  }
  &:active {
    transform: scale(0.92);
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
      <IconBtn onClick={handleSave} title="В избранное" whileHover={{ scale: 1.05 }}>
        ⭐
      </IconBtn>
      <IconBtn onClick={handleShare} title="Поделиться" whileHover={{ scale: 1.05 }}>
        📤
      </IconBtn>
      <IconBtn onClick={handleSpeak} title="Озвучить" whileHover={{ scale: 1.05 }}>
        🔊
      </IconBtn>
      <IconBtn onClick={handleCopy} title="Копировать" whileHover={{ scale: 1.05 }}>
        📋
      </IconBtn>
    </Wrapper>
  );
});