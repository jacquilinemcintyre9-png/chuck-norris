import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 32px;
  padding: 32px 24px;
  width: 100%;
  max-width: 320px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  text-align: center;
`;

const Quote = styled.span`
  font-size: 48px;
  position: absolute;
  opacity: 0.12;
  line-height: 1;
  color: #D4AF37;
  font-family: 'Georgia', serif;
  top: 8px;
  left: 16px;
`;

const QuoteBottom = styled(Quote)`
  top: auto;
  bottom: 8px;
  right: 16px;
  left: auto;
  transform: rotate(180deg);
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.92);
  padding: 8px 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  font-weight: 400;
`;

const Meta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const Tag = styled.span`
  font-size: 10px;
  color: #D4AF37;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: 'Oswald', sans-serif;
  opacity: 0.6;
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  background: #D4AF37;
  border-radius: 50%;
  opacity: 0.4;
`;

// 👇 ГЛАВНОЕ: правильное объявление компонента
// Вариант 1: функциональное выражение (без типов, подходит для JS)
interface JokeCardProps {
  joke: string;
  loading: boolean;
}

const JokeCard: React.FC<JokeCardProps> = ({ joke, loading }) => {
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      key={joke}
    >
      <Quote>❝</Quote>
      <QuoteBottom>❞</QuoteBottom>
      <Text>{loading ? 'Загрузка...' : joke}</Text>
      <Meta>
        <Tag>Факт</Tag>
        <Dot />
        <Tag>#ЧакНоррис</Tag>
      </Meta>
    </Card>
  );
};

export default JokeCard;