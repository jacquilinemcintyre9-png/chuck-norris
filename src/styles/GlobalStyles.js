import { createGlobalStyle } from 'styled-components';

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
    font-family: 'Roboto', sans-serif;
    background: #0a0a1a;
    color: #F5F5F5;
  }

  #root {
    height: 100%;
    max-width: 430px;
    margin: 0 auto;
    background: radial-gradient(circle at 20% 20%, #1a1a2e, #16213e, #0f3460);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* Декоративный туман */
  #root::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: 
      radial-gradient(circle at 70% 80%, rgba(212, 175, 55, 0.08), transparent 50%),
      radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.03), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(139, 0, 0, 0.05), transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  /* Все содержимое поверх фона */
  #root > * {
    position: relative;
    z-index: 1;
  }
`;