import axios from 'axios';

import { getToken } from './auth';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API
});

const token = getToken()
api.defaults.headers.common.Authorization = `Bearer ${token}`;