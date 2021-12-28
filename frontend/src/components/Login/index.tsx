import { ChangeEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button, InputBlock } from '../../components';

import './style.min.css';

const initialStateLogin = {
  email: "",
  password: "",
};

export function Login() {
  // const { push } = useHistory();

  const [login, setLogin] = useState(initialStateLogin);

  function handleChangeLogin(e: ChangeEvent<HTMLInputElement>) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  return (
    <div id="login">
      <header>
        <h3>Login</h3>
      </header>

      <form autoComplete="off">
        <InputBlock type="email" label="E-mail" title="Insira seu e-mail" id="emailLogin"
          name="email" value={login.email} onChange={handleChangeLogin}
        />
        <InputBlock password label="Senha" title="Insira sua senha" id="passwordLogin"
          name="password" value={login.password} onChange={handleChangeLogin}
        />
        <Button variant="primary" type="button">
          Entrar
        </Button>
      </form>

      <footer>
        <span>Não tem conta?</span>
        <Link to="/register">Cadastre-se</Link>
      </footer>
    </div>
  );
}