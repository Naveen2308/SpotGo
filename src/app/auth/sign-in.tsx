import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { router } from 'expo-router';
import { Container } from '../../components/atoms/Container';
import { Typography } from '../../components/atoms/Typography';
import { Button } from '../../components/atoms/Button';
import { Colors } from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { Logo } from '../../components/atoms/Logo';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";


export default function SignInScreen() {
    const [phone, setPhone] = useState('+91');
    const [loading, setLoading] = useState(false);


    const handlePhoneLogin = async () => {
        if (phone.length < 10) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push({ pathname: '/auth/verification', params: { phone } });
        }, 1000);
    };

    const handleGoogleLogin = () => {
        console.log('Google Sign-In');
        router.replace('/(app)/home');
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

                    <PhoneInput
                        country={'in'}

                        enableSearch={false}
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                        containerStyle={{
                            width: '100%',
                            height: 50,
                            borderRadius: 8,
                        }}
                        inputStyle={{
                            width: '100%',
                            height: '100%',
                            fontSize: 16,
                            paddingLeft: 48,
                            backgroundColor: Colors.surface,
                            borderWidth: 1,
                            borderColor: '#e5e5e5',
                            color: Colors.text || '#000',
                            borderRadius: 8,
                        }}
                        buttonStyle={{
                            backgroundColor: 'transparent',
                            borderWidth: 0,
                            borderRightWidth: 1,
                            borderRightColor: '#e5e5e5',
                            borderTopLeftRadius: 8,
                            borderBottomLeftRadius: 8,
                        }}
                        dropdownStyle={{
                            width: '300px',
                        }}
                    />
                </View>

                <Button
                    title="Continue with Phone"
                    onPress={handlePhoneLogin}
                    loading={loading}
                />

                <View style={styles.divider}>
                    <View style={styles.line} />
                    <Typography variant="caption" style={styles.orText}>OR</Typography>
                    <View style={styles.line} />
                </View>

                <Button
                    title="Continue with Google"
                    variant="outline"
                    onPress={handleGoogleLogin}
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

    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.darkGray,
    },
    orText: {
        marginHorizontal: 16,
    },
    footer: {
        marginBottom: 20,
        paddingVertical: 20,
        zIndex: -9,
    },
});
