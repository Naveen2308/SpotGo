import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Container } from '../../components/atoms/Container';
import { Typography } from '../../components/atoms/Typography';
import { Button } from '../../components/atoms/Button';
import { Colors } from '../../constants/Colors';
import { Logo } from '../../components/atoms/Logo';
import * as Location from 'expo-location';
import auth from '@react-native-firebase/auth';
import { AuthStore } from '../../services/authStore';

export default function SignInScreen() {
    const [countryCode, setCountryCode] = useState('in');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    React.useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                let reverseGeocode = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                });

                if (reverseGeocode && reverseGeocode.length > 0) {
                    const country = reverseGeocode[0].isoCountryCode?.toLowerCase();
                    if (country) {
                        setCountryCode(country);
                        setPhone('');
                    }
                }
            } catch (e) {
                console.log("Location error", e);
            }
        })();
    }, []);

    const handlePhoneLogin = async () => {
        setError('');
        if (!phone || phone.length < 5) {
            setError('Please enter a valid mobile number');
            return;
        }

        setLoading(true);
        try {
            // Format phone number (ensure + prefix)
            // Hardcoding +91 for now as per the UI replacement
            const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
            console.log('Phone number: ', formattedPhone);

            const confirmationResult = await auth().signInWithPhoneNumber(formattedPhone);
            console.log('Confirmation result: ', confirmationResult);

            AuthStore.setConfirmationResult(confirmationResult);

            setLoading(false);
            router.push({ pathname: '/auth/verification', params: { phone: formattedPhone } });

        } catch (err: any) {
            setLoading(false);
            console.error(err);
            setError(err.message || 'Failed to send verification code.');
        }
    };

    return (
        <Container safe padded style={{ backgroundColor: Colors.backgroundLight }}>
            <Logo />

            <View style={styles.container}>
                <Typography variant="h1">Welcome Back</Typography>
                <Typography variant="p" color={Colors.textSecondary}>
                    watch ads, save fares.
                </Typography>
            </View>

            <View style={styles.form}>

                <View style={{ marginBottom: 20, width: '100%', zIndex: 1000 }}>
                    <Typography variant="p" style={{ marginBottom: 8, color: Colors.textSecondary }}>
                        Mobile Number
                    </Typography>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        height: 50,
                        backgroundColor: Colors.surface,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: error ? Colors.error : '#bdbdbd',
                        paddingHorizontal: 12,
                    }}>
                        <Typography variant="p" style={{ marginRight: 8, color: Colors.text }}>
                            +91
                        </Typography>
                        <View style={{ width: 1, height: '60%', backgroundColor: '#bdbdbd', marginRight: 12 }} />
                        <TextInput
                            style={{
                                flex: 1,
                                height: '100%',
                                fontSize: 16,
                                color: Colors.text || '#000',
                            }}
                            placeholder="Phone Number"
                            placeholderTextColor={Colors.textSecondary}
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={(text) => {
                                setPhone(text);
                                if (error) setError('');
                            }}
                        />
                    </View>
                    {error ? (
                        <Typography variant="caption" color={Colors.error} style={{ marginTop: 4 }}>
                            {error}
                        </Typography>
                    ) : null}
                </View>

                <Button
                    title="Continue with Phone"
                    onPress={handlePhoneLogin}
                    loading={loading}
                />

            </View>

            <View style={styles.footer}>
                <Typography variant="p" centered>
                    Don't have an account?{' '}
                    <Typography
                        variant="p"
                        color={Colors.primary}
                        onPress={() => router.push('/auth/sign-up')}
                    >
                        Sign Up
                    </Typography>
                </Typography>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 0,
    },
    form: {
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 20,
    },
    footer: {
        marginBottom: 20,
        paddingVertical: 20,
        zIndex: -9,
    },
});
