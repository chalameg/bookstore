// src/api/httpService.js or src/api/api.js
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const httpService = axios.create({
  baseURL: baseURL,
});

export default httpService;
