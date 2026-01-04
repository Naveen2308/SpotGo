import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Container } from '../../components/atoms/Container';
import { Typography } from '../../components/atoms/Typography';
import { Input } from '../../components/atoms/Input';
import { Button } from '../../components/atoms/Button';
import { Colors } from '../../constants/Colors';
import { Logo } from '../../components/atoms/Logo';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import auth from '@react-native-firebase/auth';
import { AuthStore } from '../../services/authStore';

export default function SignUpScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [countryCode, setCountryCode] = useState('in');
    const [phone, setPhone] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

    const handleSignUp = async () => {
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) newErrors.name = 'Full Name is required';
        if (!phone || phone.length < 5) newErrors.phone = 'Valid mobile number is required';
        if (!termsAccepted) newErrors.terms = 'You must accept the Terms and Conditions';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            // Format phone number (ensure + prefix)
            const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

            console.log('Phone number: ', formattedPhone);

            const confirmationResult = await auth().signInWithPhoneNumber(formattedPhone);
            console.log('Confirmation result: ', confirmationResult);

            AuthStore.setConfirmationResult(confirmationResult);

            setLoading(false);
            // Pass generic user data if needed, or store it in context/store
            router.push({ pathname: '/auth/verification', params: { phone: formattedPhone, name } });

        } catch (err: any) {
            setLoading(false);
            console.error(err);
            setErrors({ ...errors, phone: err.message || 'Failed to send verification code.' });
        }
    };

    return (
        <Container safe padded style={{ backgroundColor: Colors.backgroundLight }}>
            <Logo />



            <View style={styles.container}>
                <Typography variant="h1">Create Account</Typography>
                <Typography variant="p" color={Colors.textSecondary} style={{ textAlign: 'center', padding: 15 }}>
                    Join the revolution.watch ads, save money, and keep drivers happy.
                </Typography>
            </View>

            <View style={styles.form}>
                <View style={{ marginBottom: 16 }}>
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        value={name}
                        onChangeText={(text) => {
                            setName(text);
                            if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        // Assuming Input component handles validation style via error prop or we wrap it
                        containerStyle={{ marginBottom: 0 }}
                    />
                    {errors.name ? (
                        <Typography variant="caption" color={Colors.error} style={{ marginTop: 4 }}>
                            {errors.name}
                        </Typography>
                    ) : null}
                </View>

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
                        borderColor: errors.phone ? Colors.error : '#bdbdbd',
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
                                if (errors.phone) setErrors({ ...errors, phone: '' });
                            }}
                        />
                    </View>
                    {errors.phone ? (
                        <Typography variant="caption" color={Colors.error} style={{ marginTop: 4 }}>
                            {errors.phone}
                        </Typography>
                    ) : null}
                </View>

                <View style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={() => {
                        setTermsAccepted(!termsAccepted);
                        if (errors.terms) setErrors({ ...errors, terms: '' });
                    }}>
                        <MaterialIcons
                            name={termsAccepted ? "check-circle" : "radio-button-unchecked"}
                            size={24}
                            color={errors.terms ? Colors.error : (termsAccepted ? Colors.primary : Colors.textSecondary)}
                        />
                    </TouchableOpacity>
                    <Typography variant="caption" style={styles.termsText}>
                        I agree to the{' '}
                        <Typography
                            variant="caption"
                            color={Colors.primary}
                            onPress={() => router.push('/legal/terms')}
                        >
                            Terms of Service
                        </Typography>
                        {' '}and{' '}
                        <Typography
                            variant="caption"
                            color={Colors.primary}
                            onPress={() => router.push('/legal/privacy')}
                        >
                            Privacy Policy
                        </Typography>
                    </Typography>
                </View>
                {errors.terms ? (
                    <Typography variant="caption" color={Colors.error} style={{ marginBottom: 10, marginTop: -16, marginLeft: 34 }}>
                        {errors.terms}
                    </Typography>
                ) : null}

                <Button
                    title="Sign Up"
                    onPress={handleSignUp}
                    loading={loading}
                    disabled={!termsAccepted}
                />
            </View>

            <View style={styles.footer}>
                <Typography variant="p" centered>
                    Already have an account?{' '}
                    <Typography
                        variant="p"
                        color={Colors.primary}
                        onPress={() => router.push('/auth/sign-in')}
                    >
                        Sign In
                    </Typography>
                </Typography>
            </View>

        </Container>
    );
}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    termsText: {
        marginLeft: 10,
        flex: 1,
    },
});
