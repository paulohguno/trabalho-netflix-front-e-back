import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_URL_API || process.env.URL_API || "http://localhost:3333";

const api = axios.create({
    baseURL,
});


api.interceptors.response.use(
    (response) => response.data,
);

export default api;