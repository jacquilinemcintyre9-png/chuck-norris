import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.8; }
  100% { opacity: 0.3; }
`;

const Frame = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  padding: 4px;
  background: conic-gradient(
    from 0deg, 
    #D4AF37, #FFF8DC, #D4AF37, #B8860B, #D4AF37
  );
  box-shadow: 0 0 40px rgba(212, 175, 55, 0.5), inset 0 0 20px rgba(212, 175, 55, 0.2);
  animation: ${rotate} 8s linear infinite;
  position: relative;
  flex-shrink: 0;

  /* Внутреннее свечение */
  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    background: inherit;
    filter: blur(15px);
    opacity: 0.4;
    z-index: -1;
    animation: ${shimmer} 3s ease-in-out infinite;
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

export default function PhotoFrame({ src }) {
  return (
    <Frame>
      <Img src={src} alt="Chuck Norris" />
    </Frame>
  );
}