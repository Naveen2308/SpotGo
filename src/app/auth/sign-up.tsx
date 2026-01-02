import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Container } from '../../components/atoms/Container';
import { Typography } from '../../components/atoms/Typography';
import { Input } from '../../components/atoms/Input';
import { Button } from '../../components/atoms/Button';
import { Colors } from '../../constants/Colors';
import { Logo } from '../../components/atoms/Logo';
import { MaterialIcons } from '@expo/vector-icons';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

export default function SignUpScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('+91');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignUp = () => {
        if (!name || !phone || !termsAccepted) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push({ pathname: '/auth/verification', params: { phone } });
        }, 1000);
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
                <Input
                    label="Full Name"
                    placeholder="John Doe"
                    value={name}
                    onChangeText={setName}
                    containerStyle={{ marginBottom: 16 }}
                />
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

                <View style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)}>
                        <MaterialIcons
                            name={termsAccepted ? "check-circle" : "radio-button-unchecked"}
                            size={24}
                            color={termsAccepted ? Colors.primary : Colors.textSecondary}
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
