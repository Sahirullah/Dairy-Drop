import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const userData = localStorage.getItem('userData');

        if (token && userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const register = async (userData) => {
        try {
            const { data } = await axios.post(`${API_URL}/users/register`, userData);
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data));
            setUser(data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const login = async (credentials) => {
        try {
            const { data } = await axios.post(`${API_URL}/users/login`, credentials);
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data));
            setUser(data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        setUser(null);
    };

    const updateProfile = async (profileData) => {
        try {
            const token = localStorage.getItem('userToken');
            const { data } = await axios.put(`${API_URL}/users/profile`, profileData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.setItem('userData', JSON.stringify(data));
            setUser(data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Update failed'
            };
        }
    };

    const refreshUser = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const { data } = await axios.get(`${API_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.setItem('userData', JSON.stringify(data));
            setUser(data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Refresh failed'
            };
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout, register, updateProfile, refreshUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};
