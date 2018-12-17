// import { getToken } from '@lib/auth';
require('dotenv').config();

const API_URL = 'http://localhost:8080/api/v1'; // process.env.API_URL;

export const getHeaders = () => ({
  // 'Authorization': `Bearer ${getToken()}`,
  'Accept': 'application/json',
});

export const urlBuilder = (endpoint) => API_URL + endpoint;
