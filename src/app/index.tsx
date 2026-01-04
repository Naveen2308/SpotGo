import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { router, Stack, useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Logo } from '../components/atoms/Logo';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

const THEME: 'light' | 'dark' = 'light';
const BG_COLOR = (THEME as string) === 'dark' ? Colors.backgroundDark : Colors.backgroundLight;
const TEXT_COLOR = (THEME as string) === 'dark' ? Colors.textDark : Colors.textLight;

export default function SplashScreen() {
    const navigation = useNavigation();
    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // 1. Logo Entrance
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();

        // 2. Progress Bar
        Animated.timing(progressAnim, {
            toValue: 1,
            duration: 2500, // 2.5 seconds loading
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false, // width doesn't support native driver
        }).start(() => {
            // 3. Navigate after loading
            setTimeout(() => {
                // Use stack navigation reset to clear history (Splash should not be reachable via back)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'auth' as never }],
                });
            }, 200);
        });
    }, []);

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style={THEME === 'dark' ? 'light' : 'dark'} translucent backgroundColor="transparent" />

            {/* Background Blobs (simulated with gradients) */}
            <View style={[styles.blob, styles.blobTop]} />
            <View style={[styles.blob, styles.blobBottom]} />

            {/* Main Content */}
            <View style={styles.centerContent}>
                <Animated.View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                    <Logo />
                </Animated.View>
            </View>

            {/* Footer / Progress */}
            <View style={styles.footer}>
                <View style={styles.progressContainer}>
                    <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
                </View>
                <Animated.Text style={[styles.version, { opacity: fadeAnim }]}>v1.0.0</Animated.Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    blob: {
        position: 'absolute',
        borderRadius: 999,
    },
    blobTop: {
        width: width * 0.8,
        height: width * 0.8,
        top: -width * 0.2,
        left: -width * 0.2,
        backgroundColor: 'rgba(60, 131, 246, 0.05)', // primary/5
        // React Native doesn't support 'blur' on Views directly in StyleSheet without libraries.
        // We can simulate slightly or just accept the flat color. 
        // If using Expo Blur, we'd put a BlurView ON TOP. 
        // Here we just leave it as a subtle shape.
    },
    blobBottom: {
        width: width * 0.6,
        height: width * 0.6,
        bottom: -width * 0.1,
        right: -width * 0.1,
        backgroundColor: 'rgba(96, 165, 250, 0.05)', // blue-400/5
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    footer: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 40,
        paddingHorizontal: 40,
    },
    progressContainer: {
        width: '100%',
        height: 6,
        backgroundColor: (THEME as string) === 'dark' ? '#1e293b' : '#e2e8f0', // slate-800 / slate-200
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 12,
    },
    progressBar: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 3,
    },
    version: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.textSecondary,
    },
});
