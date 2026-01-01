import React from 'react';
import { Text, StyleSheet, TextProps, TextStyle } from 'react-native';
import { Colors } from '../../constants/Colors';

interface TypographyProps extends TextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'button' | 'p';
    color?: string;
    centered?: boolean;
}

export const Typography: React.FC<TypographyProps> = ({
    children,
    style,
    variant = 'body',
    color = Colors.text,
    centered = false,
    ...props
}) => {
    return (
        <Text
            style={[
                styles.base,
                styles[variant],
                { color, textAlign: centered ? 'center' : 'auto' },
                style
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    base: {
        fontFamily: 'System', // Replace with custom font if added
    },
    h1: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    h3: {
        fontSize: 20,
        fontWeight: '600',
    },
    body: {
        fontSize: 16,
    },
    caption: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    button: {
        fontSize: 16,
        fontWeight: '600',
    },
    p: {
        fontSize: 16,
    }
});
