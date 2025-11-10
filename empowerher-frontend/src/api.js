import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const client = axios.create({ baseURL: API });
export default client;
