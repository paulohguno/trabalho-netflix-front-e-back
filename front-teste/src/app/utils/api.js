import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:3333` : 'http://localhost:3333');

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const publicApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/tela-login';
        }
        return Promise.reject(error);
    }
);

export const autenticacaoAPI = {
    login: (email, password) =>
        api.post('/autenticacao/login', { email, password }),

    registrar: (dados) =>
        api.post('/autenticacao/registrar', dados),

    logout: () => {
        localStorage.removeItem('token');
    },
};

export const usuariosAPI = {
    listar: () => api.get('/usuarios'),

    obter: (id) => api.get(`/usuarios/${id}`),

    criar: (dados) => api.post('/usuarios', dados),

    atualizar: (id, dados) => api.put(`/usuarios/${id}`, dados),

    deletar: (id) => api.delete(`/usuarios/${id}`),
};

export const seriesAPI = {
    listar: () => api.get('/series'),

    obter: (id) => api.get(`/series/${id}`),

    criar: (dados) => api.post('/series', dados),

    atualizar: (id, dados) => api.put(`/series/${id}`, dados),

    deletar: (id) => api.delete(`/series/${id}`),
};

export const sinopseAPI = {
    popular: () => publicApi.get('/sinopse/popular'),

    obter: (id) => api.get(`/sinopse/getcomid/${id}`),
};

export const episodiosAPI = {
    listar: () => api.get('/episodios'),

    obter: (id) => api.get(`/episodios/${id}`),

    criar: (dados) => api.post('/episodios', dados),

    atualizar: (id, dados) => api.put(`/episodios/${id}`, dados),

    deletar: (id) => api.delete(`/episodios/${id}`),
};

export const generosAPI = {
    listar: () => api.get('/generos'),

    obter: (id) => api.get(`/generos/${id}`),
};

export const autoresAPI = {
    listar: () => api.get('/autores'),

    obter: (id) => api.get(`/autores/${id}`),
};

export const perfisAPI = {
    listar: () => api.get('/perfisUsuarios'),
    obter: (id) => api.get(`/perfisUsuarios/getcomid/${id}`),
    listarPublico: () => api.get('/perfisUsuarios/public'),
};

export const perfisPublicAPI = {
    listar: () => publicApi.get('/perfisUsuarios/public'),
};

export default api;
