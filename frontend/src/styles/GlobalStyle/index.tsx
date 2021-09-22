import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  };

  html, body {
    width: 100%;
    height: 100%;
  }

  body{
    padding: 0;
    margin: 0;
  }

  #root{
    height: 100%;

    & > * {
      height: 100%;
    }
  }
`;

export default GlobalStyle;
