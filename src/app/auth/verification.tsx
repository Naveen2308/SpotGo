import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Container } from '../../components/atoms/Container';
import { Typography } from '../../components/atoms/Typography';
import { Button } from '../../components/atoms/Button';
import { OTPInput } from '../../components/molecules/OTPInput';
import { Colors } from '../../constants/Colors';
import { UserService } from '../../services/api';
import { Logo } from '../../components/atoms/Logo';

export default function VerificationScreen() {
    const params = useLocalSearchParams();
    const phone = params.phone as string;
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('');

    const handleVerify = async () => {
        if (code.length < 6) return;
        setLoading(true);

        try {
            // Simulate generic verification for now
            // In real app: await confirmResult.confirm(code);

            // Sync user to backend
            await UserService.syncProfile({
                name: 'SpotGo User', // Placeholder
                phone: phone,
                role: 'rider'
            });

            router.replace('/(app)/home');
        } catch (error) {
            console.error(error);
            alert('Verification Failed (Backend might be offline?)');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container safe padded style={{ backgroundColor: Colors.backgroundLight, flex: 1, justifyContent: 'center' }}>
            {/* <Logo /> */}

            <View style={styles.container}>
                <Typography variant="h1">Verify Phone</Typography>
                <Typography variant="p" color={Colors.textSecondary}>
                    Code sent to {phone || 'your number'}
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
