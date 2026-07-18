import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html, body {
    height: 100%;
    background: #0a0a0a;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    overflow: hidden;
  }

  #root {
    height: 100%;
    max-width: 430px;
    margin: 0 auto;
    background: #0a0a0a;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  /* Лёгкий градиент для глубины */
  #root::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.04), transparent 60%);
    pointer-events: none;
  }
`;