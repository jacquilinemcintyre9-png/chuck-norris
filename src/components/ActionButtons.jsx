import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useApp } from '../context/AppContext';

const Wrapper = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const IconBtn = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #D4AF37;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  &:hover {
    background: rgba(212, 175, 55, 0.15);
    border-color: #D4AF37;
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(212, 175, 55, 0.2);
  }
  &:active {
    transform: scale(0.92);
    background: rgba(139, 0, 0, 0.3);
    border-color: #D4AF37;
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
      <IconBtn onClick={handleSave} title="В избранное">⭐</IconBtn>
      <IconBtn onClick={handleShare} title="Поделиться">📤</IconBtn>
      <IconBtn onClick={handleSpeak} title="Озвучить">🔊</IconBtn>
      <IconBtn onClick={handleCopy} title="Копировать">📋</IconBtn>
    </Wrapper>
  );
});