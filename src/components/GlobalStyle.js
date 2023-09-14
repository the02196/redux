import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: 'Interop';
    src: url('https://raw.githubusercontent.com/payw-org/Interop/main/web/fonts/Interop-Regular.woff2')
        format('woff2'),
        url('https://raw.githubusercontent.com/payw-org/Interop/main/web/fonts/Interop-Regular.woff')
        format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: block;
    }
    *{
        margin: 0;
        padding: 0;
    }
    ul{
            list-style: none;
    }
    a{
        text-decoration: none;
        color: black;
    }
`;

export default GlobalStyle;
