import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
@font-face {
     font-family: 'S-CoreDream-3Light';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}
*{margin: 0; padding: 0; font-family: 'S-CoreDream-3Light';}
ul{list-style:none}
a{text-decoration: none; color: #000;}
`


export default GlobalStyle