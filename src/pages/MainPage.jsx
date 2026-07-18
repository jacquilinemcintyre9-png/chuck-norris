import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useJoke } from '../hooks/useJoke';
import { PhotoFrame } from '../components/PhotoFrame';
import { JokeCard } from '../components/JokeCard';

const PHOTOS = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chuck_Norris_May_2015.jpg/440px-Chuck_Norris_May_2015.jpg',
  // ... (можно оставить все как в прошлый раз)
];

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 20px 100px;
`;

const Title = styled.h1`
  font-family: 'Oswald', sans-serif;
  font-size: 34px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 10px;
  text-transform: uppercase;
  margin-bottom: 2px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-family: 'Oswald', sans-serif;
  font-size: 12px;
  color: #D4AF37;
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-bottom: 32px;
`;

const PhotoWrapper = styled(motion.div)`
  margin-bottom: 28px;
`;

const ButtonWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
  max-width: 300px;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: transparent;
  color: #fff;
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 4px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: rgba(255, 255, 255, 0.02);
    border-color: rgba(255, 255, 255, 0.15);
  }
  &:active {
    transform: scale(0.97);
  }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
`;

const IconBtn = styled.button`
  background: transparent;
  border: none;
  color: #555;
  font-size: 20px;
  cursor: pointer;
  padding: 6px;
  transition: color 0.2s;
  &:hover {
    color: #D4AF37;
  }
`;

export const MainPage = () => {
  const { state, dispatch } = useApp();
  const { fetchJoke, joke, loading } = useJoke();

  useEffect(() => {
    if (!joke) fetchJoke();
  }, []);

  const photoSrc = PHOTOS[state.photoIndex % PHOTOS.length] || PHOTOS[0];

  const handleNew = useCallback(() => fetchJoke(), [fetchJoke]);

  const handleSave = useCallback(() => {
    if (joke && !state.favorites.includes(joke.value)) {
      dispatch({ type: 'TOGGLE_FAVORITE', payload: joke.value });
    }
  }, [joke, state.favorites, dispatch]);

  const handleShare = useCallback(() => {
    if (navigator.share && joke) {
      navigator.share({ title: 'Чак Норрис', text: joke.value });
    } else if (joke) alert(joke.value);
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
      navigator.clipboard.writeText(joke.value).then(() => alert('Скопировано!'));
    }
  }, [joke]);

  return (
    <Container>
      <Title>ЧАК НОРРИС</Title>
      <Subtitle>Легендарные факты</Subtitle>

      <PhotoWrapper
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        <PhotoFrame src={photoSrc} />
      </PhotoWrapper>

      {joke && <JokeCard joke={joke.value} loading={loading} />}

      <ButtonWrapper>
        <StyledButton onClick={handleNew}>
          ↑ НОВАЯ ШУТКА
        </StyledButton>
      </ButtonWrapper>

      <ActionRow>
        <IconBtn onClick={handleSave}>⭐</IconBtn>
        <IconBtn onClick={handleShare}>📤</IconBtn>
        <IconBtn onClick={handleSpeak}>🔊</IconBtn>
        <IconBtn onClick={handleCopy}>📋</IconBtn>
      </ActionRow>
    </Container>
  );
};