import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
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

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 0;
  overflow-y: auto;
  padding-bottom: 100px;
`;

const PhotoWrapper = styled(motion.div)`
  margin-bottom: 32px;
`;

const JokeWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  margin-top: 32px;
  width: 100%;
  max-width: 340px;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 18px;
  border-radius: 12px;
  border: 1px solid rgba(212, 175, 55, 0.15);
  background: transparent;
  color: #D4AF37;
  font-family: 'Oswald', sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(212, 175, 55, 0.05);
    border-color: rgba(212, 175, 55, 0.3);
  }
  &:active {
    transform: scale(0.97);
  }
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
        initial={{ scale: 0.8, opacity: 0 }}
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
        <StyledButton onClick={handleNewJoke}>
          <span>✦</span> НОВАЯ ШУТКА
        </StyledButton>
      </ButtonWrapper>

      <ActionButtons joke={joke} />
    </Container>
  );
};