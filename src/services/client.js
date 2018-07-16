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
  // use this now instead of the two above.... if possible, and eventually change the endpoint to 'content'so it encompasses tokens and audio
  content: {
    post: formData => client.post('/audio', formData),
    getById: contentId => client.get(`/audio/${contentId}`),  // TODO add param of contentId to url?
    getPreviews: () => client.get('/audio/previews'),
  },
};

export default api;