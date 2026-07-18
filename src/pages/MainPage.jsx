import React, { useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useJoke } from '../hooks/useJoke';
import { PhotoFrame } from '../components/PhotoFrame';
import { JokeCard } from '../components/JokeCard';
import { ActionButtons } from '../components/ActionButtons';

const PHOTOS = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chuck_Norris_May_2015.jpg/440px-Chuck_Norris_May_2015.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Chuck_Norris_2007.jpg/440px-Chuck_Norris_2007.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Chuck_Norris_2012.jpg/440px-Chuck_Norris_2012.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Chuck_Norris_2015.jpg/440px-Chuck_Norris_2015.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Chuck_Norris_2017.jpg/440px-Chuck_Norris_2017.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Chuck_Norris_2018.jpg/440px-Chuck_Norris_2018.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Chuck_Norris_2019.jpg/440px-Chuck_Norris_2019.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Chuck_Norris_2020.jpg/440px-Chuck_Norris_2020.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Chuck_Norris_2021.jpg/440px-Chuck_Norris_2021.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Chuck_Norris_2022.jpg/440px-Chuck_Norris_2022.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Chuck_Norris_2023.jpg/440px-Chuck_Norris_2023.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Chuck_Norris_2024.jpg/440px-Chuck_Norris_2024.jpg'
];

const neonGlow = keyframes`
  0% { box-shadow: 0 0 10px rgba(212, 175, 55, 0.2); }
  50% { box-shadow: 0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.2); }
  100% { box-shadow: 0 0 10px rgba(212, 175, 55, 0.2); }
`;

const borderGlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const GlowWrapper = styled.div`
  padding: 3px;
  background: linear-gradient(90deg, #D4AF37, #FFF8DC, #D4AF37, #B8860B, #D4AF37);
  background-size: 300% 100%;
  border-radius: 20px;
  animation: ${borderGlow} 4s ease-in-out infinite, ${neonGlow} 2s ease-in-out infinite;
  width: 100%;
  max-width: 340px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.03);
  }
  &:active {
    transform: scale(0.97);
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 20px;
  border-radius: 18px;
  border: none;
  background: linear-gradient(135deg, #0D0D0D, #1A1A1A);
  color: #D4AF37;
  font-family: 'Oswald', sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 5px;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  transition: background 0.2s;
  &:active {
    background: #2A2A2A;
  }
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px 0;
  overflow-y: auto;
  padding-bottom: 100px;
`;

const PhotoWrapper = styled(motion.div)`
  margin-bottom: 30px;
`;

const JokeWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const MainPage = () => {
  const { state } = useApp();
  const { fetchJoke, joke, loading } = useJoke();

  useEffect(() => {
    if (!joke) fetchJoke();
  }, []);

  const photoSrc = PHOTOS[state.photoIndex % PHOTOS.length] || PHOTOS[0];

  const handleNewJoke = useCallback(() => {
    fetchJoke();
  }, [fetchJoke]);

  return (
    <Container>
      <PhotoWrapper
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        <PhotoFrame src={photoSrc} />
      </PhotoWrapper>

      {joke && (
        <JokeWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <JokeCard joke={joke.value} loading={loading} />
        </JokeWrapper>
      )}

      <ButtonWrapper>
        <GlowWrapper>
          <StyledButton onClick={handleNewJoke}>
            <span>👊</span> НОВАЯ ШУТКА
          </StyledButton>
        </GlowWrapper>
      </ButtonWrapper>

      <ActionButtons joke={joke} />
    </Container>
  );
};