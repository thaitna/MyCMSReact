import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7290/api',
});

export const fetchPosts = async (language) => {
    const response = await api.get('/post/list', {
        headers: { 'Accept-Language': language },
    });
    return response.data;
};

export const fetchLinks = async (language) => {
    const response = await api.get('/links/list', {
        headers: { 'Accept-Language': language },
    });
    return response.data;
};

export const fetchSlides = async (language) => {
    const response = await api.get('/slides/list', {
        headers: { 'Accept-Language': language },
    });
    return response.data;
};

export const fetchVideos = async (language) => {
    const response = await api.get('/videos/list', {
        headers: { 'Accept-Language': language },
    });
    return response.data;
};

export const fetchStatistics = async (language) => {
    const response = await api.get('/statistics/get', {
        headers: { 'Accept-Language': language },
    });
    return response.data;
};

export const fetchLayout = async (language) => {
    const response = await api.get('/home/layout', {
        headers: { 'Accept-Language': language },
    });
    return response.data;
};

export const saveLayout = async (moduleNames) => {
    const response = await api.post('/home/save-layout', moduleNames, {
        headers: { 'Accept-Language': localStorage.getItem('lang') || 'en-US' },
    });
    return response.data;
};

export const setLanguage = async (culture) => {
    const response = await api.post('/home/set-language', { culture, returnUrl: '/' }, {
        headers: { 'Accept-Language': culture },
    });
    return response.data;
};

export default api;