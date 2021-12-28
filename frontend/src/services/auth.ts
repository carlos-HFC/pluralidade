import Cookies from 'js-cookie';

export const isAuth = () => Cookies.get(String(process.env.REACT_APP_TOKEN)) !== undefined;

export const getToken = () => Cookies.get(String(process.env.REACT_APP_TOKEN));
export const setToken = (token: string) => Cookies.set(String(process.env.REACT_APP_TOKEN), token);

export const getUser = () => JSON.parse(String(Cookies.get(String(process.env.REACT_APP_USER))));
export const setUser = (user: string) => Cookies.set(String(process.env.REACT_APP_USER), JSON.stringify(user));