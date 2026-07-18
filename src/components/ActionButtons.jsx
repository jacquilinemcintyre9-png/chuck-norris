import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const Wrapper = styled(motion.div)`
  margin-top: 24px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const IconBtn = styled(motion.button)`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: rgba(212, 175, 55, 0.7);
  cursor: pointer;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  &:hover {
    background: rgba(212, 175, 55, 0.08);
    border-color: rgba(212, 175, 55, 0.2);
    color: #d4af37;
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
  &:active {
    transform: scale(0.92);
    background: rgba(139, 0, 0, 0.2);
    border-color: #d4af37;
  }
`;

export default function ActionButtons({ joke }) {
  const { state, dispatch } = useApp();

  const handleSave = () => {
    if (joke && !state.favorites.includes(joke.value)) {
      dispatch({ type: 'TOGGLE_FAVORITE', payload: joke.value });
    }
  };

  const handleShare = () => {
    if (navigator.share && joke) {
      navigator.share({ title: 'Чак Норрис', text: joke.value });
    } else if (joke) {
      alert(joke.value);
    }
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window && joke) {
      const utter = new SpeechSynthesisUtterance(joke.value);
      utter.lang = 'ru-RU';
      speechSynthesis.speak(utter);
    }
  };

  const handleCopy = () => {
    if (joke) {
      navigator.clipboard.writeText(joke.value).then(() => alert('Скопировано! 📋'));
    }
  };

  const btnVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.05, duration: 0.4, ease: 'easeOut' }
    })
  };

  return (
    <Wrapper
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.05 } }
      }}
    >
      <IconBtn custom={0} variants={btnVariants} onClick={handleSave} title="В избранное">⭐</IconBtn>
      <IconBtn custom={1} variants={btnVariants} onClick={handleShare} title="Поделиться">📤</IconBtn>
      <IconBtn custom={2} variants={btnVariants} onClick={handleSpeak} title="Озвучить">🔊</IconBtn>
      <IconBtn custom={3} variants={btnVariants} onClick={handleCopy} title="Копировать">📋</IconBtn>
    </Wrapper>
  );
}