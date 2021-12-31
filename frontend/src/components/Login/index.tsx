import { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, InputBlock } from '../../components';
import { useLoader } from "../../context";
import { api } from "../../services/api";
import { Alert } from '../../utils';

import { Wrapper } from './style';

const initialStateLogin = {
  email: "",
  password: "",
};

export function Login() {
  // const { push } = useHistory();
  const { handleLoader } = useLoader();

  const [login, setLogin] = useState(initialStateLogin);

  function handleChangeLogin(e: ChangeEvent<HTMLInputElement>) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  async function effectLogin(e: FormEvent) {
    e.preventDefault();

    handleLoader(true);
    try {
      const { data } = await api.post('/auth/login', login);

      console.log(data);
    } catch (error: unknown) {
      console.log((error as AxiosError).response);
      const message = typeof (error as AxiosError).response?.data.message === 'string'
        ? (error as AxiosError).response?.data.message
        : (error as AxiosError).response?.data.message[0];

      Alert(message, 'error');
    } finally {
      handleLoader(false);
    }
  }

  return (
    <Wrapper>
      <header>
        <h3>Login</h3>
      </header>

      <form autoComplete="off" onSubmit={effectLogin}>
        <InputBlock type="email" label="E-mail" title="Insira seu e-mail" id="emailLogin"
          name="email" value={login.email} onChange={handleChangeLogin}
        />
        <InputBlock password label="Senha" title="Insira sua senha" id="passwordLogin"
          name="password" value={login.password} onChange={handleChangeLogin}
        />
        <Button variant="primary" type="submit">
          Entrar
        </Button>
      </form>

      <footer>
        <span>Não tem conta?</span>
        <Link to="/register">Cadastre-se</Link>
      </footer>
    </Wrapper>
  );
}