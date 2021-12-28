import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Hamb, HeaderStyle, Menu, MenuList } from './style';
import { Login } from '..';

import logo from '../../assets/icon.png';

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <>
      <HeaderStyle />
      <header className="header" id="menu">
        <div className="container">
          <div className="brand" title="Pluralidade">
            <Link to="/">
              <img src={logo} alt="Logo Pluralidade" title="Logo Pluralidade" loading="lazy" />
            </Link>
          </div>
          <Menu>
            <div className="hamb" title="Abrir menu" onClick={() => setOpenMenu(true)}>
              <Hamb />
              <Hamb />
              <Hamb />
            </div>
            <MenuList active={openMenu}>
              <div className="close" title="Fechar menu">
                <MdClose cursor="pointer" color="white" size={24} onClick={() => setOpenMenu(false)} />
              </div>
              <div className="list">
                <Link onClick={() => setOpenMenu(false)} to="/" title="Home" className="link">Home</Link>
                <Link onClick={() => setOpenMenu(false)} to="" title="Cursos" className="link">Cursos</Link>
                <Link onClick={() => setOpenMenu(false)} to="" title="Eventos" className="link">Eventos</Link>
                <Link onClick={() => setOpenMenu(false)} to="/aboutus" title="Sobre Nós" className="link">Sobre Nós</Link>
                <Link onClick={() => setOpenMenu(false)} to="" title="Contato" className="link">Contato</Link>
                <span onClick={() => setOpenLogin(true)} title="Login" className="link">
                  Login
                </span>
              </div>
            </MenuList>
          </Menu>
        </div>
      </header>
      <Modal contentClassName="login" centered show={openLogin} onHide={() => setOpenLogin(false)}>
        <div className="d-flex justify-content-end">
          <MdClose onClick={() => setOpenLogin(false)} cursor="pointer" size={24} />
        </div>
        <Login />
      </Modal>
    </>
  );
};