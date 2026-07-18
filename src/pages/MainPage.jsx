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

const weaponCharge = keyframes`
  0% { box-shadow: 0 0 10px rgba(255, 0, 0, 0.2); }
  50% { box-shadow: 0 0 40px rgba(255, 0, 0, 0.8), 0 0 80px rgba(212, 175, 55, 0.3); }
  100% { box-shadow: 0 0 10px rgba(255, 0, 0, 0.2); }
`;

const GlowWrapper = styled.div`
  padding: 3px;
  background: linear-gradient(90deg, #ff0000, #D4AF37, #ff0000);
  background-size: 300% 100%;
  border-radius: 20px;
  animation: weaponCharge 2s ease-in-out infinite;
  width: 100%;
  max-width: 340px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.03);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 20px;
  border-radius: 18px;
  border: none;
  background: linear-gradient(135deg, #0a0a0f, #1a0a0a);
  color: #ff0000;
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
  transition: all 0.2s;
  text-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
  &:active {
    background: #1a0a0a;
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
        initial={{ scale: 0.5, opacity: 0 }}
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
            <span>⚡</span> НОВАЯ ШУТКА
          </StyledButton>
        </GlowWrapper>
      </ButtonWrapper>

      <ActionButtons joke={joke} />
    </Container>
  );
};