import axios from 'axios';

const api = axios.create({
    baseURL: 'https://boletos-frontend.herokuapp.com/'
});

export default api;