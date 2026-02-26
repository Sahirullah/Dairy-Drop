import React, { createContext, useState, useEffect } from 'react';
import { adminAPI } from '../services/api';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const adminData = localStorage.getItem('adminData');

        if (token && adminData) {
            setAdmin(JSON.parse(adminData));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const { data } = await adminAPI.login(credentials);
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminData', JSON.stringify(data));
            setAdmin(data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        setAdmin(null);
    };

    return (
        <AdminContext.Provider value={{ admin, login, logout, loading }}>
            {children}
        </AdminContext.Provider>
    );
};
