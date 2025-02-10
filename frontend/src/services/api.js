import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'http://backend:3001'
    : 'http://localhost:3001'
});

export const getFilesData = async (fileName = '') => {
  const params = fileName ? { fileName } : {};
  const response = await api.get('/files/data', { params });
  return response.data;
};

export const getFilesList = async () => {
  const response = await api.get('/files/list');
  return response.data;
};

export default api;