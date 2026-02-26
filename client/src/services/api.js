import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Admin API
export const adminAPI = {
    login: (credentials) => api.post('/admin/login', credentials),
    register: (data) => api.post('/admin/register', data),
    getProfile: () => api.get('/admin/profile'),
};

// Products API
export const productsAPI = {
    getAll: () => api.get('/products'),
    getById: (id) => api.get(`/products/${id}`),
    create: (formData) => api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    update: (id, formData) => api.put(`/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    delete: (id) => api.delete(`/products/${id}`),
    deleteImage: (id, imageUrl) => api.delete(`/products/${id}/image`, { data: { imageUrl } }),
};

// Users API
export const usersAPI = {
    getAll: () => api.get('/users'),
    getById: (id) => api.get(`/users/${id}`),
    update: (id, data) => api.put(`/users/${id}`, data),
    delete: (id) => api.delete(`/users/${id}`),
};

// Categories API
export const categoriesAPI = {
    getAll: () => api.get('/categories'),
    getFeatured: () => api.get('/categories/featured'),
    getById: (id) => api.get(`/categories/${id}`),
    create: (formData) => api.post('/categories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    update: (id, formData) => api.put(`/categories/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    delete: (id) => api.delete(`/categories/${id}`),
};

// Orders API
export const ordersAPI = {
    getAll: () => api.get('/orders/admin/all'),
    getMyOrders: () => {
        const token = localStorage.getItem('userToken');
        return api.get('/orders/myorders', {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
    getById: (id) => {
        const token = localStorage.getItem('userToken');
        return api.get(`/orders/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
    updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
    delete: (id) => api.delete(`/orders/admin/${id}`),
};

export default api;
