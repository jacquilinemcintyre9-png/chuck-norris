import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #0a0a0a;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 4px 12px;
  color: #444;
  text-decoration: none;
  transition: color 0.2s;
  font-family: 'Oswald', sans-serif;
  &.active {
    color: #D4AF37;
  }
  .icon { font-size: 20px; }
  .label {
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

export const Navigation = () => (
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