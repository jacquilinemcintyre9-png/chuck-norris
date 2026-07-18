import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }

  html, body {
    height: 100%;
    overflow: hidden;
    font-family: 'Roboto', sans-serif;
    background: #0a0a0f;
    color: #ffffff;
  }

  #root {
    height: 100%;
    max-width: 430px;
    margin: 0 auto;
    background: radial-gradient(circle at 20% 20%, #1a0a0a, #0a0a0f 70%, #050508 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* Анимированная сетка (киберпанк-эффект) */
  #root::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px);
    background-size: 30px 30px;
    animation: gridMove 20s linear infinite;
    pointer-events: none;
    z-index: 0;
  }

  @keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(30px, 30px); }
  }

  /* Неоновые пятна (динамические) */
  #root::after {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 70% 20%, rgba(255, 0, 0, 0.08), transparent 50%),
      radial-gradient(circle at 30% 80%, rgba(212, 175, 55, 0.06), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(255, 0, 0, 0.04), transparent 60%);
    pointer-events: none;
    z-index: 0;
    animation: neonPulse 4s ease-in-out infinite alternate;
  }

  @keyframes neonPulse {
    0% { opacity: 0.5; }
    100% { opacity: 1; }
  }

  #root > * {
    position: relative;
    z-index: 1;
  }
`;