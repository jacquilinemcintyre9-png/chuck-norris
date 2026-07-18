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
    background: #0a0a1a;
    color: #F5F5F5;
  }

  #root {
    height: 100%;
    max-width: 430px;
    margin: 0 auto;
    background: 
      radial-gradient(circle at 20% 20%, #1a1a2e, #16213e 40%, #0f3460 80%, #0a0a1a 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  #root::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 70% 80%, rgba(212, 175, 55, 0.10), transparent 50%),
      radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.04), transparent 40%),
      radial-gradient(circle at 60% 40%, rgba(139, 0, 0, 0.08), transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  #root::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
  }

  #root > * {
    position: relative;
    z-index: 1;
  }
`;