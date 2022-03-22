import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Login, Modal } from '..';

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

  function handleOpenMenu(active: boolean) {
    setOpenMenu(active);

    setTimeout(() => {
      active
        ? document.body.style.overflow = "hidden"
        : document.body.style.overflow = "auto";
    }, 500);
  }

  function handleOpenLogin(active: boolean) {
    setOpenMenu(false);
    setOpenLogin(active);

    setTimeout(() => {
      active
        ? document.body.style.overflow = "hidden"
        : document.body.style.overflow = "auto";
    }, 500);
  }

  return (
    <>
      <HeaderWrapper id="menu">
        <div className="container">
          <div className="brand" title="Pluralidade">
            <Link to="/">
              <img src={logo} alt="Logo Pluralidade" title="Logo Pluralidade" loading="lazy" width={864} height={400} />
            </Link>
          </div>
          <Menu>
            <div className="hamb" title="Abrir menu" onClick={() => handleOpenMenu(true)}>
              <Hamb />
              <Hamb />
              <Hamb />
            </div>
            <MenuList active={openMenu}>
              <div className="close" title="Fechar menu">
                <MdClose cursor="pointer" color="white" size={24} onClick={() => handleOpenMenu(false)} />
              </div>
              <div className="list">
                {menuItems.map((item, i) => (
                  <Link key={i} onClick={() => handleOpenMenu(false)} to={item.link} title={item.title} className="link">
                    {item.title}
                  </Link>
                ))}
                <span onClick={() => handleOpenLogin(true)} title="Login" className="link">
                  Login
                </span>
              </div>
            </MenuList>
          </Menu>
        </div>
      </HeaderWrapper>
      <Modal className="login" show={openLogin} onHide={() => handleOpenLogin(false)}>
        <div className="close">
          <MdClose onClick={() => handleOpenLogin(false)} cursor="pointer" size={24} />
        </div>
        <Login />
      </Modal>
    </>
  );
};