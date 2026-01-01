import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Container } from '../../components/atoms/Container';
import { Typography } from '../../components/atoms/Typography';
import { Input } from '../../components/atoms/Input';
import { Button } from '../../components/atoms/Button';
import { Colors } from '../../constants/Colors';
import { Logo } from '../../components/atoms/Logo';


export default function SignUpScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);



    const handleSignUp = () => {
        // Validate
        if (!name || !phone) return;

        setLoading(true);
        // Simulate API
        setTimeout(() => {
            setLoading(false);
            router.push({ pathname: '/auth/verification', params: { phone } });
        }, 1000);
    };

    return (
        <Container safe>
            <Logo />
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <Typography variant="h1">Create Account</Typography>
                    <Typography variant="body" color={Colors.textSecondary}>
                        Join SpotGo today
                    </Typography>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        value={name}
                        onChangeText={setName}
                    />
                    <Input
                        label="Email Address (Optional)"
                        placeholder="john@example.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        label="Phone Number"
                        placeholder="+1 234 567 8900"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />

                    <Button
                        title="Sign Up"
                        onPress={handleSignUp}
                        loading={loading}
                        style={styles.button}
                    />
                </View>

                <View style={styles.footer}>
                    <Typography variant="caption" centered>
                        Already have an account?{' '}
                        <Typography
                            variant="caption"
                            color={Colors.primary}
                            onPress={() => router.push('/auth/sign-in')}
                        >
                            Sign In
                        </Typography>
                    </Typography>
                </View>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    scroll: {
        padding: 20,
        flexGrow: 1,
    },
    header: {
        marginTop: 20,
        marginBottom: 30,
    },
    form: {
        flex: 1,
    },
    button: {
        marginTop: 20,
    },
    footer: {
        paddingVertical: 20,
    },
});
