import axios from "axios";

const api = axios.create({
    baseURL: 'https://restfastpay.herokuapp.com'
});

export default api;