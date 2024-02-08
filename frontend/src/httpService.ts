// src/api/httpService.js or src/api/api.js
import axios from 'axios';

const baseURL = 'https://bookstorebackend-ii1w.onrender.com/api';

const httpService = axios.create({
  baseURL: baseURL,
});

export default httpService;
