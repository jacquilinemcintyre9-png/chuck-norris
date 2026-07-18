import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.3); }
  50% { box-shadow: 0 0 60px rgba(212, 175, 55, 0.7); }
  100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.3); }
`;

const Frame = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  padding: 5px;
  background: conic-gradient(
    from 0deg, 
    #D4AF37, #FFF8DC, #D4AF37, #B8860B, #D4AF37
  );
  animation: ${rotate} 10s linear infinite, ${pulse} 3s ease-in-out infinite;
  position: relative;
  flex-shrink: 0;
  box-shadow: 0 0 40px rgba(212, 175, 55, 0.3);

  &::before {
    content: '';
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.15), transparent 70%);
    z-index: -1;
    filter: blur(10px);
  }

  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: conic-gradient(from 0deg, #D4AF37, #FFF8DC, #D4AF37, #B8860B, #D4AF37);
    filter: blur(15px);
    opacity: 0.4;
    z-index: -1;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  border: 3px solid #0D0D0D;
  display: block;
`;

export const PhotoFrame = React.memo(({ src }) => {
  return (
    <Frame>
      <Img src={src} alt="Chuck Norris" />
    </Frame>
  );
});