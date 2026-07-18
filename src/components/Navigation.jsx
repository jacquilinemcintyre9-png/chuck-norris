import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.04);
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
  padding: 6px 16px;
  border-radius: 12px;
  color: #555;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: 'Oswald', sans-serif;
  &.active {
    color: #D4AF37;
  }
  .icon {
    font-size: 20px;
    transition: transform 0.2s;
  }
  .label {
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  &:hover .icon {
    transform: scale(1.05);
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