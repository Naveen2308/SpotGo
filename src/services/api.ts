import axios from 'axios';
import { getAuth } from 'firebase/auth';

// Use localhost for emulator (10.0.2.2 for Android, localhost for iOS)
// For physical device, replace with your PC's IP address (e.g., 192.168.1.5)
const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add Firebase Token
api.interceptors.request.use(async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export const UserService = {
    syncProfile: async (data: any) => {
        return api.post('/users/profile', data);
    },
    getProfile: async () => {
        return api.get('/users/profile');
    },
};

export const RideService = {
    requestRide: async (pickup: any, dropoff: any, distance: number) => {
        return api.post('/rides/request', { pickup, dropoff, distance });
    },
    getHistory: async () => {
        return api.get('/rides/history');
    },
};

export default api;
