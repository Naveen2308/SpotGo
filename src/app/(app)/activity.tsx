import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Container } from '../../components/atoms/Container';
import { Typography } from '../../components/atoms/Typography';
import { Colors } from '../../constants/Colors';

const DATA = [
    { id: '1', date: 'Today, 10:23 AM', destination: 'Office', price: '$12.50' },
    { id: '2', date: 'Yesterday, 8:45 PM', destination: 'Home', price: '$18.20' },
];

export default function ActivityScreen() {
    return (
        <Container safe padded>
            <Typography variant="h1">Your Activity</Typography>

            <FlatList
                data={DATA}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View>
                            <Typography variant="h3">{item.destination}</Typography>
                            <Typography variant="caption">{item.date}</Typography>
                        </View>
                        <Typography variant="h3" color={Colors.primary}>{item.price}</Typography>
                    </View>
                )}
                contentContainerStyle={styles.list}
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    list: {
        marginTop: 20,
    },
    card: {
        backgroundColor: Colors.surface,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
