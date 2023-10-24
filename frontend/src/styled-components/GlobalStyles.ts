import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,300;0,400;1,100;1,200&family=Teko:wght@300&display=swap');
  
  .exo-font {
    font-family: 'Exo 2', sans-serif;
    font-size: 400;
    font-style: italic;
  }
`;

export default GlobalStyles;
