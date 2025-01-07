import axios from 'axios';
import { BACKEND_API_URL } from '../config';

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${BACKEND_API_URL}/auth/login`, {
        email,
        password,
    });

    localStorage.setItem("email", response.data.payload.email)
    localStorage.setItem("name", response.data.payload.name)
    localStorage.setItem("userId", response.data.payload.id)
    localStorage.setItem("token", response.data.payload.token)

    return response.data;
};

export const register = async (name: string, email: string, password: string) => {
    const response = await axios.post(`${BACKEND_API_URL}/auth/register`, {
        name,
        email,
        password,
    });

    localStorage.setItem("email", response.data.payload.email)
    localStorage.setItem("name", response.data.payload.name)
    localStorage.setItem("userId", response.data.payload.id)

    return response.data;
};

export const verifyEmail = async (email: string, token: string) => {
    const response = await axios.post(`${BACKEND_API_URL}/auth/verify-email`, {
        email,
        emailVerificationToken: token,
    });

    return response.data;
};

export const reSendToken = async (email: string) => {
    const response = await axios.get(`${BACKEND_API_URL}/auth/resend-verification-email/${email}`);

    return response.data;
}

export const forgotPassword = async (email: string) => {
    const response = await axios.post(`${BACKEND_API_URL}/forgot-password`, {
        email,
    });

    return response.data;
};

export const resetPassword = async (email: string, token: string, password: string) => {
    const response = await axios.post(`${BACKEND_API_URL}/reset-password`, {
        email,
        token,
        password,
    });

    return response.data;
};

export const logout = async () => {
    const response = await axios.post(`${BACKEND_API_URL}/logout`);

    return response.data;
};
