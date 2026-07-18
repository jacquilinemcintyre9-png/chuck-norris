import React from 'react';
import { useApp } from '../context/AppContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  padding: 16px 20px 80px;
  flex: 1;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-family: 'Oswald', sans-serif;
  font-size: 26px;
  color: #D4AF37;
  text-align: center;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 24px;
  text-shadow: 0 2px 20px rgba(212, 175, 55, 0.2);
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled(motion.div)`
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 14px 16px;
  display: flex;
  gap: 12px;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  .text {
    flex: 1;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.85);
  }
  
  .del {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.3);
    font-size: 18px;
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(139, 0, 0, 0.3);
      color: #fff;
    }
    &:active {
      background: #8B0000;
      color: #fff;
    }
  }
`;

const EmptyState = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.3);
  font-size: 16px;
  margin-top: 40px;
  font-family: 'Oswald', sans-serif;
  letter-spacing: 2px;
`;

export default function FavoritesPage() {
  const { state, dispatch } = useApp();

  const remove = (joke) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: joke });
  };

  return (
    <Container>
      <Title>Избранное</Title>
      <List>
        {state.favorites.length === 0 && (
          <EmptyState>Пока нет избранных шуток</EmptyState>
        )}
        {state.favorites.map((joke, i) => (
          <Item
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <span className="text">{joke}</span>
            <button className="del" onClick={() => remove(joke)}>🗑️</button>
          </Item>
        ))}
      </List>
    </Container>
  );
}