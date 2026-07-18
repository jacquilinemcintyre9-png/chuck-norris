import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% { transform: rotate(0deg); filter: hue-rotate(0deg); }
  100% { transform: rotate(360deg); filter: hue-rotate(360deg); }
`;

const neonPulse = keyframes`
  0% { box-shadow: 0 0 20px rgba(255, 0, 0, 0.3), 0 0 40px rgba(212, 175, 55, 0.1); }
  50% { box-shadow: 0 0 40px rgba(255, 0, 0, 0.8), 0 0 80px rgba(212, 175, 55, 0.3); }
  100% { box-shadow: 0 0 20px rgba(255, 0, 0, 0.3), 0 0 40px rgba(212, 175, 55, 0.1); }
`;

const Frame = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  padding: 4px;
  background: conic-gradient(from 0deg, #ff0000, #D4AF37, #ff0000, #D4AF37, #ff0000);
  animation: ${rotate} 6s linear infinite, ${neonPulse} 2s ease-in-out infinite;
  position: relative;
  flex-shrink: 0;
  box-shadow: 0 0 40px rgba(255, 0, 0, 0.3);

  &::before {
    content: '';
    position: absolute;
    inset: -15px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 0, 0, 0.15), transparent 70%);
    z-index: -1;
    filter: blur(20px);
    animation: ${neonPulse} 2s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: conic-gradient(from 0deg, #ff0000, #D4AF37, #ff0000, #D4AF37, #ff0000);
    filter: blur(20px);
    opacity: 0.5;
    z-index: -1;
    animation: ${rotate} 6s linear infinite;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  border: 3px solid #0a0a0f;
  display: block;
  filter: contrast(1.2) saturate(1.3);
`;

export const PhotoFrame = React.memo(({ src }) => {
  return (
    <Frame>
      <Img src={src} alt="Chuck Norris" />
    </Frame>
  );
});