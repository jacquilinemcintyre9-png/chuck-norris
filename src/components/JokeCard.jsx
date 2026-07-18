import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Card = styled(motion.div)`
  background: rgba(10, 10, 15, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 32px 24px;
  width: 100%;
  max-width: 340px;
  border: 1px solid rgba(255, 0, 0, 0.2);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.8),
    inset 0 0 30px rgba(255, 0, 0, 0.05);
  position: relative;
  text-align: center;
  overflow: hidden;

  /* Голографический эффект (сканирующая линия) */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 40%,
      rgba(255, 0, 0, 0.03) 50%,
      transparent 60%
    );
    animation: scan 3s linear infinite;
    pointer-events: none;
  }

  @keyframes scan {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
  }

  /* Неоновая рамка (пульсирующая) */
  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 24px;
    background: linear-gradient(90deg, #ff0000, #D4AF37, #ff0000);
    background-size: 200% 100%;
    z-index: -1;
    animation: borderGlow 3s ease-in-out infinite;
    opacity: 0.3;
    filter: blur(10px);
  }

  @keyframes borderGlow {
    0% { background-position: 0% 50%; opacity: 0.3; }
    50% { background-position: 100% 50%; opacity: 0.6; }
    100% { background-position: 0% 50%; opacity: 0.3; }
  }
`;

const Quote = styled.span`
  font-size: 64px;
  position: absolute;
  opacity: 0.1;
  line-height: 1;
  color: #ff0000;
  font-family: 'Georgia', serif;
  top: 4px;
  left: 16px;
  text-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
`;

const QuoteBottom = styled(Quote)`
  top: auto;
  bottom: 4px;
  right: 16px;
  left: auto;
  transform: rotate(180deg);
`;

const Text = styled(motion.p)`
  font-size: 18px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.95);
  padding: 12px 0;
  text-shadow: 0 0 20px rgba(255, 0, 0, 0.2);
  font-weight: 400;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.5px;
`;

const Meta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 0, 0, 0.1);
`;

const Tag = styled.span`
  font-size: 10px;
  color: #ff0000;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-family: 'Oswald', sans-serif;
  opacity: 0.6;
  text-shadow: 0 0 20px rgba(255, 0, 0, 0.2);
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  background: #ff0000;
  border-radius: 50%;
  opacity: 0.4;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
`;

export const JokeCard = React.memo(({ joke, loading }) => {
  return (
    <AnimatePresence mode="wait">
      <Card
        key={joke}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Quote>❝</Quote>
        <QuoteBottom>❞</QuoteBottom>
        <Text
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {loading ? 'ЗАГРУЗКА...' : joke}
        </Text>
        <Meta>
          <Tag>ФАКТ</Tag>
          <Dot />
          <Tag>#ЧАКНОРРИС</Tag>
        </Meta>
      </Card>
    </AnimatePresence>
  );
});