import React from 'react';
import { TextInput, View, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from './Typography';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    containerStyle,
    style,
    ...props
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Typography variant="caption" style={styles.label}>{label}</Typography>}
            <TextInput
                style={[styles.input, error ? styles.inputError : null, style]}
                placeholderTextColor={Colors.textSecondary}
                {...props}
            />
            {error && <Typography variant="caption" color={Colors.error} style={styles.error}>{error}</Typography>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: '100%',
    },
    label: {
        marginBottom: 6,
        color: Colors.textSecondary,
    },
    input: {
        backgroundColor: Colors.surface,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: Colors.text,
        borderWidth: 1,
        borderColor: 'transparent',
        fontSize: 16,
    },
    inputError: {
        borderColor: Colors.error,
    },
    error: {
        marginTop: 4,
    },
});
