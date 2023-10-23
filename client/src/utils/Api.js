/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import getLanguage from './getLanguage.js';

const host = `${window.location.protocol}//${window.location.host}`;
let base = '';

const axiosBase = axios.create({
  baseURL: `${base}/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'accept-language': 'en',
    'Access-Control-Allow-Origin': host
  }
});
axiosBase.interceptors.request.use(
  async (config) => {
    const { user, authenticated } = JSON.parse(
      localStorage.getItem('auth')
    ) || {
      user: null,
      authenticated: false
    };
    config.headers['accept-language'] = getLanguage();
    if (user && authenticated === true) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
const refreshToken = async () => {
  try {
    const response = await axiosBase.get('/accounts/refresh');
    if (response?.data?.data?.access_token) {
      localStorage.setItem('token', response.data.data.access_token);
      return response.data.data.access_token;
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      localStorage.removeItem('auth');
      localStorage.removeItem('token');
      // eslint-disable-next-line no-return-assign
      return (window.location = '/login');
    }
    return Promise.reject(error);
  }
};

axiosBase.interceptors.response.use(null, async (error) => {
  const originalRequest = error.config;
  if (error.config && error.response && error.response.status === 401) {
    if (originalRequest._retry === undefined) {
      originalRequest._retry = true;
      const accessToken = await refreshToken();
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosBase.request(originalRequest);
    }
  }
  if (error?.response?.status === 403) {
    window.location = '/login';
    return Promise.reject(error);
  }
  return Promise.reject(error);
});

export { axiosBase, base };
export default axiosBase;
