import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(10, 10, 15, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 0, 0, 0.1);
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
  color: #4a4a5a;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: 'Oswald', sans-serif;
  &.active {
    color: #ff0000;
    text-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
    background: rgba(255, 0, 0, 0.05);
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