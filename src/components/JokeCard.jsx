import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: 36px;
  padding: 36px 28px;
  width: 100%;
  max-width: 340px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  text-align: center;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 20%;
    right: 20%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #D4AF37, transparent);
    opacity: 0.5;
  }
`;

const Quote = styled.span`
  font-size: 56px;
  position: absolute;
  opacity: 0.08;
  line-height: 1;
  color: #D4AF37;
  font-family: 'Georgia', serif;
  top: 4px;
  left: 16px;
`;

const QuoteBottom = styled(Quote)`
  top: auto;
  bottom: 4px;
  right: 16px;
  left: auto;
  transform: rotate(180deg);
`;

const Text = styled.p`
  font-size: 17px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.92);
  padding: 8px 0;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  font-weight: 400;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Meta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const Tag = styled.span`
  font-size: 10px;
  color: #D4AF37;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-family: 'Oswald', sans-serif;
  opacity: 0.5;
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  background: #D4AF37;
  border-radius: 50%;
  opacity: 0.3;
`;

export const JokeCard = React.memo(({ joke, loading }) => {
  return (
    <AnimatePresence mode="wait">
      <Card
        key={joke}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
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
    </AnimatePresence>
  );
});