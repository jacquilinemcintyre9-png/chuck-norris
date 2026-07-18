import { createGlobalStyle, keyframes } from 'styled-components';

const particlesFloat = keyframes`
  0% { transform: translateY(0px) scale(1); opacity: 0.3; }
  50% { transform: translateY(-20px) scale(1.2); opacity: 0.8; }
  100% { transform: translateY(0px) scale(1); opacity: 0.3; }
`;

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }

  html, body {
    height: 100%;
    overflow: hidden;
    font-family: 'Inter', 'Roboto', sans-serif;
    background: #07070e;
    color: #F5F5F5;
  }

  #root {
    height: 100%;
    max-width: 430px;
    margin: 0 auto;
    background: 
      radial-gradient(ellipse at 20% 50%, #1a1030 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, #0f1a3a 0%, transparent 50%),
      radial-gradient(ellipse at 50% 100%, #2a0a1a 0%, transparent 40%),
      #07070e;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    isolation: isolate;
  }

  /* Декоративные частицы (псевдоэлементы) */
  #root::before,
  #root::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    filter: blur(60px);
  }

  #root::before {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.12), transparent 70%);
    top: -100px;
    right: -100px;
    animation: ${particlesFloat} 8s ease-in-out infinite alternate;
  }

  #root::after {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(139, 0, 0, 0.08), transparent 70%);
    bottom: -150px;
    left: -150px;
    animation: ${particlesFloat} 12s ease-in-out infinite alternate-reverse;
  }

  /* Все содержимое поверх фона */
  #root > * {
    position: relative;
    z-index: 1;
  }

  /* Стили для скролла */
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;