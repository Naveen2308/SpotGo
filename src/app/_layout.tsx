import { Stack } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/Colors';
import { AuthStore } from '../services/authStore';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        // Load fonts here if needed
    });

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Check for persistent session
        const prepare = async () => {
            try {
                const loggedIn = await AuthStore.loadSession();
                console.log('Auth check result:', loggedIn);

                if (!loggedIn) {
                    console.log('Session: Not Logged In');
                } else {
                    console.log('Session: Restored');
                }
            } catch (e) {
                console.warn(e);
            } finally {
                // Ensure we always set ready
                setIsReady(true);
            }
        };

        prepare();

        // Safety timeout in case something hangs
        const timer = setTimeout(() => {
            console.log("Forcing ready state after timeout");
            setIsReady(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded && isReady) {
            console.log("Hiding Splash Screen");
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, isReady]);

    if (!fontsLoaded) {
        return null;
    }



    // ...

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar style="dark" backgroundColor={Colors.background} />

            <Stack screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: Colors.background }
            }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="auth" />
                <Stack.Screen name="(app)" />
                <Stack.Screen
                    name="legal/terms"
                    options={{
                        presentation: 'transparentModal',
                        animation: 'fade',
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="legal/privacy"
                    options={{
                        presentation: 'transparentModal',
                        animation: 'fade',
                        headerShown: false
                    }}
                />
            </Stack>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
});
