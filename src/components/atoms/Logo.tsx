import React, { useRef } from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'
import { Colors } from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

const THEME: 'light' | 'dark' = 'light';
const BG_COLOR = THEME === 'dark' ? Colors.backgroundDark : Colors.backgroundLight;
const TEXT_COLOR = THEME === 'dark' ? Colors.textDark : Colors.textLight;


export const Logo = () => {
    return (
        <View style={styles.centerContent}>
            <View style={styles.logoContainer}>
                <View style={styles.logoCard}>
                    <MaterialIcons name="two-wheeler" size={64} color={Colors.primary} />
                </View>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    Spot<Text style={{ color: Colors.primary }}>Go</Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    logoContainer: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoCard: {
        width: 90,
        height: 90,
        backgroundColor: THEME === 'dark' ? '#1a2332' : '#FFFFFF',
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: THEME === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: TEXT_COLOR,
        includeFontPadding: false,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.textSecondary,
        letterSpacing: 2.4, // tracking-[0.15em] approx
        textTransform: 'uppercase',
    }
});
