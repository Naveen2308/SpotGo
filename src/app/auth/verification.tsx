import React, { useState, useEffect } from 'react';
import { View, StyleSheet, BackHandler, Alert } from 'react-native';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Container } from '../../components/atoms/Container';
import { Typography } from '../../components/atoms/Typography';
import { Button } from '../../components/atoms/Button';
import { OTPInput } from '../../components/molecules/OTPInput';
import { Colors } from '../../constants/Colors';
import { UserService, AuthService } from '../../services/api';
import { Logo } from '../../components/atoms/Logo';

import { AuthStore } from '../../services/authStore';

export default function VerificationScreen() {
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const phone = params.phone as string;
    const name = params.name as string; // Optional name from signup
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('');

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Cancel Verification?', 'Are you sure you want to go back?', [
                {
                    text: 'No',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => navigation.goBack() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    const handleVerify = async () => {
        if (code.length < 6) return;
        setLoading(true);

        try {
            const confirmationResult = AuthStore.getConfirmationResult();
            console.log('Confirmation result:', confirmationResult);
            if (!confirmationResult) {
                throw new Error('No verification session found. Please try again.');
            }

            // 1. Verify OTP with Firebase
            const result = await confirmationResult.confirm(code);
            console.log('Verification result:', result);

            if (!result || !result.user) {
                throw new Error("Verification failed: No user returned");
            }
            const user = result.user;
            console.log('User signed in (Firebase):', user);

            // 2. Login with AuthMaster to get Access Token
            // We use the phone number from params or user.phoneNumber
            const userPhone = user.phoneNumber || phone;
            if (!userPhone) throw new Error("Phone number missing");

            const authResponse = await AuthService.login(user.uid, userPhone);
            const { accessToken, refreshToken } = authResponse;
            console.log('AuthMaster Login Success:', authResponse);

            // 3. Store Token
            // 3. Store Persistent Token
            await AuthStore.login(accessToken, refreshToken, user.uid);

            // 4. Check if User Profile exists in Uses-MicroService
            let profileExists = false;
            try {
                // If profile not found, it throws 404
                await UserService.getUser(user.uid);
                profileExists = true;
            } catch (err: any) {
                if (err.response && err.response.status === 404) {
                    profileExists = false;
                } else {
                    throw err;
                }
            }

            // 5. Handle Sign-In vs Sign-Up
            if (profileExists) {
                // User exists, proceed to Home
                AuthStore.setConfirmationResult(null); // Clear OTP state
                // Use stack navigation reset to clear history and go to Home
                navigation.reset({
                    index: 0,
                    routes: [{ name: '(app)' as never }],
                });
            } else {
                // User does not exist in DB
                if (name) {
                    // Sign-Up Flow: Create Profile
                    await UserService.syncProfile({
                        name: name,
                        displayName: name, // Using name as display name for now
                        phone: userPhone,
                        role: 'rider',
                        uid: user.uid,
                        email: '' // Add email if collected
                    });

                    AuthStore.setConfirmationResult(null);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: '(app)' as never }],
                    });
                } else {
                    alert('Account not found. Please complete your profile.');
                    router.push({ pathname: '/auth/sign-up', params: { phone: userPhone, uid: user.uid } });
                }
            }

        } catch (error: any) {
            console.error(error);
            alert(`Verification Failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container safe padded style={{ backgroundColor: Colors.backgroundLight, flex: 1, justifyContent: 'center' }}>

            <View style={styles.container}>
                <Typography variant="h1">Verify Phone</Typography>
                <Typography variant="p" color={Colors.textSecondary}>
                    Code sent to {phone}
                </Typography>
            </View>

            <View style={styles.form}>
                <OTPInput
                    length={6}
                    onComplete={(c) => setCode(c)}
                />

                <Button
                    title="Verify"
                    onPress={handleVerify}
                    loading={loading}
                    disabled={code.length < 6}
                    style={styles.button}
                />

                <Typography variant="p" centered style={styles.resend}>
                    Didn't receive code? <Typography variant="p" color={Colors.primary}>Resend</Typography>
                </Typography>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 0,
    },
    form: {
        paddingHorizontal: 20,
        width: '100%',
    },
    button: {
        marginTop: 40,
    },
    resend: {
        marginTop: 20,
    },
});
