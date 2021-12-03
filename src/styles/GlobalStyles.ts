import {createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }
  
  html {
      min-height: 100%;
      background:  var(--primary);
  }

  *, button , input {
      border: 0;
      background:  none;
      color: var(--black);
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
      list-style: none;

      transition: color .2s ease-out;
    }

  ul {
      list-style: none;
  }

  li {
      list-style: none;
  }

  
  :root  {
    ${(props) => {
      const theme = props.theme;

      let append = '';
      Object.entries(theme).forEach(([prop, value]) => {
        append += `--${prop} : ${value};`;
      });
      return append;
    }}
  }
`;