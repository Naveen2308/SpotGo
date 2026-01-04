import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Colors } from '../../constants/Colors';

interface OTPInputProps {
    length?: number;
    onComplete: (code: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete }) => {
    const [code, setCode] = useState<string[]>(new Array(length).fill(''));
    const inputs = useRef<Array<TextInput | null>>([]);

    const handleChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < length - 1) {
            inputs.current[index + 1]?.focus();
        }

        if (newCode.every(c => c !== '')) {
            onComplete(newCode.join(''));
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <View style={styles.container}>
            {code.map((digit, index) => (
                <TextInput
                    key={index}
                    ref={ref => { if (inputs.current) inputs.current[index] = ref; }}
                    style={[styles.input, digit ? styles.filled : null]}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={text => handleChange(text, index)}
                    onKeyPress={e => handleKeyPress(e, index)}
                    selectionColor={Colors.primary}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 20,
    },
    input: {
        width: 45,
        height: 55,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.darkGray,
        backgroundColor: Colors.surface,
        color: Colors.text,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    filled: {
        borderColor: Colors.primary,
        backgroundColor: 'rgba(0, 200, 83, 0.1)',
    },
});
