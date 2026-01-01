import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { Container } from '../../components/atoms/Container';
import { Typography } from '../../components/atoms/Typography';
import { Button } from '../../components/atoms/Button';
import { Colors } from '../../constants/Colors';

export default function ProfileScreen() {
    const handleLogout = () => {
        // TODO: Implement logout
        router.replace('/auth/sign-in');
    };

    return (
        <Container safe padded>
            <View style={styles.header}>
                <View style={styles.avatarPlaceholder} />
                <Typography variant="h2" style={styles.name}>John Doe</Typography>
                <Typography variant="body" color={Colors.textSecondary}>+1 234 567 8900</Typography>
            </View>

            <View style={styles.section}>
                <Button title="Edit Profile" variant="outline" onPress={() => { }} />
                <Button title="Payment Methods" variant="ghost" onPress={() => { }} />
                <Button title="Settings" variant="ghost" onPress={() => { }} />
            </View>

            <Button
                title="Log Out"
                onPress={handleLogout}
                style={styles.logout}
                variant="secondary"
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 20,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.surface,
        marginBottom: 16,
    },
    name: {
        marginBottom: 4,
    },
    section: {
        flex: 1,
    },
    logout: {
        backgroundColor: Colors.error,
    }
});
