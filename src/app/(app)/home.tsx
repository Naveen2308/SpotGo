import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Container } from '../../components/atoms/Container';
import { Typography } from '../../components/atoms/Typography';
import { Input } from '../../components/atoms/Input';
import { Button } from '../../components/atoms/Button';
import { RideOptionCard } from '../../components/molecules/RideOptionCard';
import { RideService } from '../../services/api';
import { Colors } from '../../constants/Colors';

export default function HomeScreen() {
    return (
        <Container>
            {/* Map Placeholder */}
            <View style={styles.mapContainer}>
                <Typography variant="h3" color={Colors.textSecondary}>Map View</Typography>
            </View>

            {/* Booking Overlay */}
            <View style={styles.bookingCard}>
                <Typography variant="h3">Where to?</Typography>
                <Input
                    placeholder="Enter destination"
                    containerStyle={styles.input}
                />

                <View style={{ marginTop: 20 }}>
                    <RideOptionCard
                        title="SpotGo Standard"
                        price="$12.50"
                        eta="4 min"
                        selected={true}
                        onPress={() => { }}
                    />
                    <RideOptionCard
                        title="SpotGo Premium"
                        price="$24.00"
                        eta="6 min"
                        selected={false}
                        onPress={() => { }}
                    />
                </View>

                <Button
                    title="Request Ride"
                    style={{ marginTop: 10 }}
                    onPress={async () => {
                        try {
                            // Example data
                            const pickup = { address: "Current Location", lat: 0, lng: 0 };
                            const dropoff = { address: "Destination", lat: 0, lng: 0 };
                            await RideService.requestRide(pickup, dropoff, 5.2);
                            alert('Ride Requested Successfully!');
                        } catch (e) {
                            alert('Failed to request ride (Backend offline?)');
                            console.error(e);
                        }
                    }}
                />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        backgroundColor: '#2C2C2C', // Placeholder map color
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookingCard: {
        backgroundColor: Colors.surface,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    input: {
        marginTop: 16,
    }
});
