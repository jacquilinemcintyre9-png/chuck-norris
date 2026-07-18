import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(13, 13, 13, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 50;
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 20px;
  border-radius: 16px;
  color: #71797E;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: 'Oswald', sans-serif;
  &.active {
    color: #D4AF37;
    background: rgba(212, 175, 55, 0.1);
  }
  .icon {
    font-size: 24px;
    transition: transform 0.2s;
  }
  .label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  &:hover .icon {
    transform: scale(1.1);
  }
`;

export const Navigation = () => {
  return (
    <Nav>
      <NavItem to="/" end>
        <span className="icon">👊</span>
        <span className="label">Шутки</span>
      </NavItem>
      <NavItem to="/categories">
        <span className="icon">📂</span>
        <span className="label">Категории</span>
      </NavItem>
      <NavItem to="/favorites">
        <span className="icon">⭐</span>
        <span className="label">Избранное</span>
      </NavItem>
    </Nav>
  );
};