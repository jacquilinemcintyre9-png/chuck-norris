import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Frame = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, #D4AF37, #B8860B, #D4AF37);
  animation: ${rotate} 12s linear infinite;
  box-shadow: 0 0 40px rgba(212, 175, 55, 0.15);
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #0a0a0a;
  display: block;
`;

export const PhotoFrame = React.memo(({ src }) => (
  <Frame>
    <Img src={src} alt="Chuck Norris" />
  </Frame>
));