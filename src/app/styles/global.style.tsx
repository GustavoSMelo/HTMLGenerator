import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
        * {
        border: 0;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #fff;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    body, html {
        background-color: #101010;
    }
`;

export default GlobalStyle;
