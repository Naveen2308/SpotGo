import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { router } from 'expo-router';
import { Container } from '../../components/atoms/Container';
import { Typography } from '../../components/atoms/Typography';
import { Input } from '../../components/atoms/Input';
import { Button } from '../../components/atoms/Button';
import { Colors } from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { Logo } from '../../components/atoms/Logo';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';


export default function SignInScreen() {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [countryCode, setCountryCode] = useState<CountryCode>('IN');
    const [callingCode, setCallingCode] = useState('91');

    const onSelectCountry = (country: Country) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0]);
    };

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
                    Sign in to continue your journey
                </Typography>
            </View>

            <View style={styles.form}>
                <View style={styles.mobileNumberContainer}>
                    <View style={styles.countryPickerWrapper}>
                        <Typography variant="caption" style={styles.label}>Code</Typography>
                        <View style={styles.countryPickerInput}>
                            <CountryPicker
                                countryCode={countryCode}
                                withFilter
                                withFlag
                                withCallingCodeButton
                                withAlphaFilter
                                withCallingCode
                                onSelect={onSelectCountry}
                                containerButtonStyle={styles.countryPickerButton}
                            />
                            <Typography variant="body" style={{ marginLeft: 4 }}>+{callingCode}</Typography>
                        </View>
                    </View>
                    <Input
                        label="Mobile Number"
                        placeholder="1234567890"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        containerStyle={{ flex: 1, marginBottom: 0 }}
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
                <Typography variant="caption" centered>
                    Don't have an account?{' '}
                    <Typography
                        variant="caption"
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
        flex: 1,
        backgroundColor: Colors.backgroundLight,
        alignItems: 'center',
        overflow: 'hidden',
    },
    header: {
        marginTop: 40,
        marginBottom: 40,
    },
    form: {
        flex: 1,
    },
    mobileNumberContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end', // Align inputs at the bottom so labels align at top if heights match, or better: align bottom of containers? 
        // Actually Input has label inside container. 
        // Let's use 'flex-start' or default.
        gap: 10,
        marginBottom: 16,
    },
    countryPickerWrapper: {
        width: 100,
        marginBottom: 0,
    },
    label: {
        marginBottom: 6,
        color: Colors.textSecondary,
    },
    countryPickerInput: {
        backgroundColor: Colors.surface,
        borderRadius: 8,
        paddingHorizontal: 12, // Slightly less than Input's 16
        paddingVertical: 12,
        // height: 48, // approximate height of Input 
        // Input has vertical padding 12, fontSize 16. ~24+24 = 48? 
        // Actually line height might vary. Let's trust padding.
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    countryPickerButton: {
        // any specific overrides for the picker touchable
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
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
        paddingVertical: 20,
    },
});
