import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '../atoms/Typography';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface RideOptionProps {
    title: string;
    price: string;
    eta: string;
    selected?: boolean;
    onPress: () => void;
}

export const RideOptionCard: React.FC<RideOptionProps> = ({
    title,
    price,
    eta,
    selected,
    onPress
}) => {
    return (
        <TouchableOpacity
            style={[styles.container, selected && styles.selected]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.icon}>
                <Ionicons name="car" size={24} color={selected ? Colors.black : Colors.text} />
            </View>
            <View style={styles.info}>
                <Typography variant="h3" style={selected && { color: Colors.black }}>{title}</Typography>
                <Typography variant="caption" style={selected && { color: Colors.black }}>{eta} away</Typography>
            </View>
            <Typography variant="h3" style={selected && { color: Colors.black }}>{price}</Typography>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        backgroundColor: Colors.surface,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selected: {
        backgroundColor: Colors.primary,
    },
    icon: {
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
});
