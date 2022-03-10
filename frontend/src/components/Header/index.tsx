import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Login } from '..';

import logo from '../../assets/icon.png';

import { Hamb, HeaderWrapper, Menu, MenuList } from './style';

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const menuItems = [
    {
      title: "Home",
      link: "/"
    },
    {
      title: "Cursos",
      link: "/courses"
    },
    {
      title: "Eventos",
      link: "/events"
    },
    {
      title: "Sobre Nós",
      link: "/aboutus"
    },
    {
      title: "Contato",
      link: "/contact"
    },
  ];

  return (
    <>
      <HeaderWrapper id="menu">
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
                {menuItems.map((item, i) => (
                  <Link key={i} onClick={() => setOpenMenu(false)} to={item.link} title={item.title} className="link">
                    {item.title}
                  </Link>
                ))}
                <span onClick={() => setOpenLogin(true)} title="Login" className="link">
                  Login
                </span>
              </div>
            </MenuList>
          </Menu>
        </div>
      </HeaderWrapper>
      <Modal contentClassName="login" centered show={openLogin} onHide={() => setOpenLogin(false)}>
        <div className="d-flex justify-content-end">
          <MdClose onClick={() => setOpenLogin(false)} cursor="pointer" size={24} />
        </div>
        <Login />
      </Modal>
    </>
  );
};