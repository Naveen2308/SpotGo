import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// Keys for storage
const KEY_ACCESS_TOKEN = 'auth_access_token';
const KEY_REFRESH_TOKEN = 'auth_refresh_token';
const KEY_USER_UID = 'auth_user_uid';

let confirmationResult: FirebaseAuthTypes.ConfirmationResult | null = null;
let accessToken: string | null = null;

export const AuthStore = {
    // --- OTP Flow (Temporary) ---
    setConfirmationResult: (result: FirebaseAuthTypes.ConfirmationResult | null) => {
        confirmationResult = result;
    },
    getConfirmationResult: () => {
        return confirmationResult;
    },

    loadSession: async () => {
        try {
            const token = await AsyncStorage.getItem(KEY_ACCESS_TOKEN);
            if (token) {
                accessToken = token;
                return true; // Logged in
            }
        } catch (error) {
            console.error('Failed to load session:', error);
        }
        return false;
    },

    login: async (token: string, refreshToken: string, uid: string) => {
        accessToken = token;
        try {
            await AsyncStorage.multiSet([
                [KEY_ACCESS_TOKEN, token],
                [KEY_REFRESH_TOKEN, refreshToken],
                [KEY_USER_UID, uid]
            ]);
        } catch (error) {
            console.error('Failed to save session:', error);
        }
    },

    logout: async () => {
        accessToken = null;
        confirmationResult = null;
        try {
            await AsyncStorage.multiRemove([KEY_ACCESS_TOKEN, KEY_REFRESH_TOKEN, KEY_USER_UID]);
            router.replace('/auth/sign-in');
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    },

    getAccessToken: () => {
        return accessToken;
    }
};
