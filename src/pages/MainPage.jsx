import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useJoke } from '../hooks/useJoke';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import PhotoFrame from '../components/PhotoFrame';
import JokeCard from '../components/JokeCard';
import ActionButtons from '../components/ActionButtons';

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

const liquidGold = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const GlowWrapper = styled(motion.div)`
  padding: 3px;
  background: linear-gradient(90deg, #b8860b, #d4af37, #fff8dc, #d4af37, #b8860b);
  background-size: 300% 100%;
  border-radius: 20px;
  animation: ${liquidGold} 4s ease-in-out infinite;
  width: 100%;
  max-width: 340px;
  box-shadow: 0 0 40px rgba(212, 175, 55, 0.15);
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 0 60px rgba(212, 175, 55, 0.3);
    transform: scale(1.02);
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
  background: #0a0a12;
  color: #d4af37;
  font-family: 'Oswald', sans-serif;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 6px;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  transition: background 0.3s ease;
  &:active {
    background: #12121e;
  }
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 0;
  overflow-y: auto;
  padding-bottom: 80px;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 16px;
  margin-top: 4px;
`;

const Title = styled.h1`
  font-family: 'Oswald', sans-serif;
  font-size: 32px;
  font-weight: 300;
  letter-spacing: 12px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.p`
  font-family: 'Georgia', serif;
  font-size: 12px;
  color: rgba(212, 175, 55, 0.6);
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-top: 4px;
  font-style: italic;
`;

const PhotoWrapper = styled(motion.div)`
  margin-bottom: 28px;
`;

const JokeWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ButtonWrapper = styled(motion.div)`
  margin-top: 28px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function MainPage() {
  const { state } = useApp();
  const { fetchJoke, joke, loading } = useJoke();

  useEffect(() => {
    if (!joke) fetchJoke();
  }, []);

  const photoSrc = PHOTOS[state.photoIndex % PHOTOS.length] || PHOTOS[0];

  const handleNewJoke = () => {
    fetchJoke();
  };

  return (
    <Container>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Title>Чак Норрис</Title>
        <Subtitle>Легендарные факты</Subtitle>
      </Header>

      <PhotoWrapper
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 }}
      >
        <PhotoFrame src={photoSrc} />
      </PhotoWrapper>

      {joke && (
        <JokeWrapper
          key={joke.value}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
        >
          <JokeCard joke={joke.value} loading={loading} />
        </JokeWrapper>
      )}

      <ButtonWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <GlowWrapper>
          <StyledButton onClick={handleNewJoke}>
            <span>👊</span> Новая шутка
          </StyledButton>
        </GlowWrapper>
      </ButtonWrapper>

      <ActionButtons joke={joke} />
    </Container>
  );
}