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
    background: #0a0a0a;
    color: #ffffff;
  }

  #root {
    height: 100%;
    max-width: 430px;
    margin: 0 auto;
    background: #0a0a0a;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* Едва заметный градиент для глубины */
  #root::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.03), transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  #root > * {
    position: relative;
    z-index: 1;
  }
`;