import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulseGlow = keyframes`
  0% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.1); opacity: 0.9; }
  100% { transform: scale(1); opacity: 0.6; }
`;

const orbit = keyframes`
  0% { transform: rotate(0deg) translateX(75px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(75px) rotate(-360deg); }
`;

const Frame = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  padding: 5px;
  background: conic-gradient(
    from 0deg,
    #b8860b,
    #d4af37,
    #fff8dc,
    #d4af37,
    #b8860b
  );
  box-shadow: 
    0 0 60px rgba(212, 175, 55, 0.4),
    0 0 120px rgba(212, 175, 55, 0.1);
  animation: ${rotate} 10s linear infinite;
  position: relative;
  flex-shrink: 0;

  /* Внешнее свечение */
  &::after {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50%;
    background: inherit;
    filter: blur(25px);
    opacity: 0.3;
    z-index: -1;
    animation: ${pulseGlow} 4s ease-in-out infinite;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  border: 3px solid #0a0a12;
  display: block;
`;

// Сателлиты — маленькие золотые точки, вращающиеся вокруг
const Satellite = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d4af37;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.8);
  top: 50%;
  left: 50%;
  margin-top: -4px;
  margin-left: -4px;
  animation: ${orbit} 6s linear infinite;
`;

const Satellite2 = styled(Satellite)`
  animation-duration: 8s;
  animation-direction: reverse;
  width: 6px;
  height: 6px;
  opacity: 0.7;
  margin-top: -3px;
  margin-left: -3px;
`;

export default function PhotoFrame({ src }) {
  return (
    <Frame>
      <Img src={src} alt="Chuck Norris" />
      <Satellite />
      <Satellite2 />
    </Frame>
  );
}