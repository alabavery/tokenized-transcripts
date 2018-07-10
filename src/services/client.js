import axios from 'axios';

const API = `http://localhost:7777`;
const REQUEST_TIMEOUT = 10000;

// axios "singleton" instance
const client = axios.create({
  baseURL: API,
  timeout: REQUEST_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

const api = {
  saveTokens: { post: json => client.post('/tokens', json) },
  saveAudio: { post: formData => client.post('/audio', formData) },
};

export default api;