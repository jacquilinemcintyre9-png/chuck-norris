import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(40px) saturate(1.4);
  -webkit-backdrop-filter: blur(40px) saturate(1.4);
  border-radius: 40px;
  padding: 36px 28px 28px;
  width: 100%;
  max-width: 340px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 0 0 1px rgba(255, 255, 255, 0.02);
  position: relative;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  /* Дополнительная подсветка сверху */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 20%;
    right: 20%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.15), transparent);
  }
`;

const Quote = styled.span`
  font-size: 56px;
  position: absolute;
  opacity: 0.06;
  line-height: 1;
  color: #d4af37;
  font-family: 'Georgia', serif;
  top: 4px;
  left: 20px;
`;

const QuoteBottom = styled(Quote)`
  top: auto;
  bottom: 4px;
  right: 20px;
  left: auto;
  transform: rotate(180deg);
`;

const Text = styled(motion.p)`
  font-size: 17px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.92);
  padding: 12px 4px 8px;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  font-weight: 350;
  letter-spacing: 0.01em;
`;

const Meta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
`;

const Tag = styled.span`
  font-size: 9px;
  color: rgba(212, 175, 55, 0.5);
  text-transform: uppercase;
  letter-spacing: 3px;
  font-family: 'Oswald', sans-serif;
  font-weight: 300;
`;

const Dot = styled.div`
  width: 3px;
  height: 3px;
  background: rgba(212, 175, 55, 0.2);
  border-radius: 50%;
`;

export default function JokeCard({ joke, loading }) {
  return (
    <Card
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.96 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      key={joke}
    >
      <Quote>❝</Quote>
      <QuoteBottom>❞</QuoteBottom>
      <Text
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {loading ? 'Загрузка...' : joke}
      </Text>
      <Meta>
        <Tag>Факт</Tag>
        <Dot />
        <Tag>#ЧакНоррис</Tag>
      </Meta>
    </Card>
  );
}