import axios from 'axios';

const api = axios.create({
    baseURL: 'https://boletos-backend.herokuapp.com/'
});

export default api;