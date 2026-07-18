import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 50;
  padding-bottom: env(safe-area-inset-bottom);
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 16px;
  border-radius: 14px;
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: 'Oswald', sans-serif;
  position: relative;
  
  .icon {
    font-size: 24px;
    transition: transform 0.2s;
  }
  .label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &.active {
    color: #D4AF37;
    background: rgba(212, 175, 55, 0.12);
    .icon {
      transform: scale(1.1);
    }
  }

  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export default function Navigation() {
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
}