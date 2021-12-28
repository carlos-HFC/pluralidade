import { darken } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    transition: color .3s, background-color .3s;
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.buttons.primary};
    
    &:hover {
      background: ${props => darken(.05, props.theme.buttons.primary)};
    }
  }

  body {
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
  }

  .header {
    background: ${props => props.theme.header};
    color: ${props => props.theme.text};

    .menu-list {
      background: ${props => props.theme.header};
    }
  }

  .login, #signup {
    background: ${props => props.theme.login.background};

    h3, a, svg {
      color: ${props => props.theme.text}
    }
  }

  .footer {
    background: ${props => props.theme.footer};

    *, a {
      color: ${props => props.theme.text} !important;
    }
  }
  
  .facebook {
    background: ${props => props.theme.facebook};
  }
  
  .twitter {
    background: ${props => props.theme.twitter};
  }
  
  .instagram {
    background: ${props => props.theme.instagram};
  }
`;