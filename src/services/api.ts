import axios from 'axios';
import { AuthStore } from './authStore'; // Assuming you might store tokens here or similar

// Use localhost for emulator (10.0.2.2 for Android, localhost for iOS)
const USERS_SERVICE_URL = 'http://localhost:5000/api';
const AUTH_SERVICE_URL = 'http://localhost:5001/api';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add Access Token from our AuthMaster
api.interceptors.request.use(async (config) => {
    // Check if request is for Auth service (login), skip token
    if (config.url?.includes('auth/login')) {
        return config;
    }

    // Retrieve token (You might need to implement getAccessToken in AuthStore or similar)
    // For now, let's assume we pass it or retrieve it from a global store/state.
    // In a real app, use SecureStore or AsyncStorage.
    // Here we'll try to get it from AuthStore if we add a method, or assume the caller passes it?
    // Better: Helper function to get token.

    // TEMPORARY: Assuming verification page handles the logic and local storage of token.
    // But for global requests, we need a stored token.
    // Let's stick to manual token passing for now or read from wherever you store it.

    // If you have a way to get the token:
    const token = AuthStore.getAccessToken(); // We need to add this method to AuthStore
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export const AuthService = {
    login: async (uid: string, phone: string) => {
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/login`, { uid, phone });
        return response.data; // { uid, accessToken, refreshToken }
    }
};

export const UserService = {
    syncProfile: async (data: any) => {
        return api.post(`${USERS_SERVICE_URL}/users/profile`, data);
    },
    getUser: async (uid: string) => {
        return api.get(`${USERS_SERVICE_URL}/users/${uid}`);
    },
    // getProfile: async () => {
    //     return api.get(`${USERS_SERVICE_URL}/users/profile`); // If you had a /me endpoint
    // },
};

export const RideService = {
    requestRide: async (pickup: any, dropoff: any, distance: number) => {
        return api.post(`${USERS_SERVICE_URL}/rides/request`, { pickup, dropoff, distance });
    },
    getHistory: async () => {
        return api.get(`${USERS_SERVICE_URL}/rides/history`);
    },
};

export default api;
