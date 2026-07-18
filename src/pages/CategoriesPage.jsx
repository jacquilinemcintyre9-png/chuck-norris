import React from 'react';
import { useApp } from '../context/AppContext';
import { useJoke } from '../hooks/useJoke';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const categoryMap = {
  animal: '🐾 Животные',
  career: '💼 Карьера',
  celebrity: '🌟 Знаменитости',
  dev: '💻 IT',
  explicit: '🔞 18+',
  fashion: '👗 Мода',
  food: '🍔 Еда',
  history: '📜 История',
  money: '💰 Деньги',
  movie: '🎬 Кино',
  music: '🎵 Музыка',
  political: '🏛️ Политика',
  religion: '⛪ Религия',
  science: '🧪 Наука',
  sport: '⚽ Спорт',
  travel: '✈️ Путешествия'
};

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
`;

const CategoryItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18px 8px;
  gap: 6px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(212, 175, 55, 0.08);
    border-color: rgba(212, 175, 55, 0.2);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: scale(0.94);
    background: rgba(139, 0, 0, 0.2);
    border-color: #D4AF37;
  }

  .icon {
    font-size: 32px;
  }
  .name {
    font-size: 11px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
    font-family: 'Oswald', sans-serif;
    letter-spacing: 1px;
    text-align: center;
  }
`;

export default function CategoriesPage() {
  const { state } = useApp();
  const { fetchJoke } = useJoke();
  const navigate = useNavigate();

  const handleSelect = (cat) => {
    fetchJoke(cat);
    navigate('/');
  };

  return (
    <Container>
      <Title>Категории</Title>
      <Grid>
        {state.categories.map((cat, index) => (
          <CategoryItem
            key={cat}
            onClick={() => handleSelect(cat)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="icon">{categoryMap[cat]?.split(' ')[0] || '📁'}</span>
            <span className="name">{categoryMap[cat] || cat}</span>
          </CategoryItem>
        ))}
      </Grid>
    </Container>
  );
}