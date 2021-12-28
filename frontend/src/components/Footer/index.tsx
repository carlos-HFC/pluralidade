import { FaFacebookF, FaHeart, FaInstagram, FaTwitter } from 'react-icons/fa';

import logo from '../../assets/logo.png';

import { FooterStyle } from './style';

export function Footer() {
  return (
    <>
      <FooterStyle />
      <footer className="footer" id="footer">
        <div className="container">
          <div className="footer__cols logo">
            <img src={logo} alt="Logo Pluralidade" title="Logo Pluralidade" loading="lazy" />
          </div>
          <div className="footer__cols social">
            <a title="Link para o Facebook" href="https://facebook.com" target="_blank" rel="noreferrer" className="facebook">
              <FaFacebookF />
              <span>Facebook</span>
            </a>
            <a title="Link para o Twitter" href="https://twitter.com" target="_blank" rel="noreferrer" className="twitter">
              <FaTwitter />
              <span>Twitter</span>
            </a>
            <a title="Link para o Instagram" href="https://instagram.com" target="_blank" rel="noreferrer" className="instagram">
              <FaInstagram />
              <span>Instagram</span>
            </a>
          </div>
        </div>
        <div className="container">
          <div className="copy">
            <span title={`Copyright ${new Date().getFullYear()} Direitos autorais reservados | Feito com amor por CHFC`}>
              Copyright &copy;{new Date().getFullYear()} Direitos autorais reservados | Feito com <FaHeart fill="red" /> por CHFC
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}