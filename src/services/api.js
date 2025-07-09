import axios from 'axios';

// Tạo instance axios với baseURL mặc định
const api = axios.create({
    baseURL: 'https://localhost:7290/api',
    headers: {
        'Accept-Language': localStorage.getItem('lang') || 'en-US', // Giá trị mặc định từ localStorage
    },
});

// Hàm để cập nhật header Accept-Language khi cần
const setLanguageHeader = (language) => {
    api.defaults.headers['Accept-Language'] = language || localStorage.getItem('lang') || 'en-US';
};

// Hàm fetch dữ liệu chung với xử lý lỗi
const fetchData = async (url, language) => {
    try {
        setLanguageHeader(language);
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error.message);
        throw error;
    }
};

// Hàm gửi dữ liệu chung với xử lý lỗi
const sendData = async (url, data, language) => {
    try {
        setLanguageHeader(language);
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        console.error(`Error sending data to ${url}:`, error.message);
        throw error;
    }
};

// Các hàm fetch dữ liệu
export const fetchPosts = (language) => fetchData('/posts/list', language);
export const fetchLinks = (language) => fetchData('/links/list', language);
export const fetchSlides = (language) => fetchData('/slides/list', language);
export const fetchVideos = (language) => fetchData('/videos/list', language);
export const fetchStatistics = (language) => fetchData('/statistics/get', language);
export const fetchLayout = (language) => fetchData('/home/layout', language);

// Các hàm gửi dữ liệu
export const saveLayout = (moduleNames, language) => sendData('/home/save-layout', moduleNames, language);
export const setLanguage = (culture) => sendData('/home/set-language', { culture, returnUrl: '/' }, culture);

// Export instance api để sử dụng trực tiếp nếu cần
export default api;