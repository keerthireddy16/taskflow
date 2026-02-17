'use client';

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import api from '../services/api';
import { toast } from 'react-toastify';

interface User {
    _id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const checkUserLoggedIn = useCallback(async () => {
        try {
            const { data } = await api.get('/auth/me');
            setUser(data.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkUserLoggedIn();
    }, [checkUserLoggedIn]);

    // Auto-logout logic: Intercept 401s and clear user state
    useEffect(() => {
        const interceptor = api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    setUser(null);
                    router.push('/login');
                    toast.error('Session expired. Please login again.');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.response.eject(interceptor);
        };
    }, [router]);

    const login = async (email: string, password: string) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            setUser(data.data);
            router.push('/dashboard');
            toast.success('Welcome back to TaskFlow!');
            return true;
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const { data } = await api.post('/auth/register', { name, email, password });
            setUser(data.data);
            router.push('/dashboard');
            toast.success('Registration successful. Welcome!');
            return true;
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            setUser(null);
            router.push('/login');
            toast.info('Logged out safely');
        } catch (error) {
            console.error('Logout failed', error);
            // Even if API fails, clear local state
            setUser(null);
            router.push('/login');
        }
    };

    const updateProfile = async (userData: Partial<User>) => {
        try {
            const { data } = await api.put('/auth/profile', userData);
            setUser(data.data);
            toast.success('Profile updated successfully');
            return true;
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Profile update failed');
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
