import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Frame = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(135deg, #D4AF37, #B8860B, #D4AF37);
  animation: ${rotate} 12s linear infinite;
  position: relative;
  flex-shrink: 0;
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.15);

  &::after {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.08), transparent 70%);
    z-index: -1;
    filter: blur(10px);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  border: 2px solid #0a0a0a;
  display: block;
`;

export const PhotoFrame = React.memo(({ src }) => {
  return (
    <Frame>
      <Img src={src} alt="Chuck Norris" />
    </Frame>
  );
});