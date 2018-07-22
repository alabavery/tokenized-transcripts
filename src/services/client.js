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
  content: {
    post: formData => client.post('/content', formData),
  },
  audio: {
    getPreviews: () => client.get('/audio/previews'),
    getFileByPath: pathToAudioFile => client.get(`/audio/fileByPath?path=${pathToAudioFile}`)
  },
  phrases: {
    getByOriginalAudioId: originalAudioId => client.get(`/phrase/byOriginalAudioId?id=${originalAudioId}`),
  },

};

export default api;