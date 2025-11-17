import axios from 'axios';

const api = axios.create({
  baseURL: 'https://691b88483aaeed735c8d7de8.mockapi.io',
  timeout: 10000,
});

export default api;
