import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Typography } from '../../components/atoms/Typography';
import { Colors } from '../../constants/Colors';
import { Button } from '../../components/atoms/Button';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';

export default function TermsScreen() {
  return (
    <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
      <View style={styles.popup}>
        <Typography variant="h2" style={styles.header}>Terms of Service</Typography>
        <ScrollView style={styles.scroll}>
          <Typography variant="p" style={styles.text}>
            1. Introduction{'\n'}
            Welcome to SpotGo. By using our app, you agree to these terms.{'\n\n'}
            2. Usage{'\n'}
            You agree to use the app for lawful purposes only.{'\n\n'}
            3. Data{'\n'}
            We collect minimal data to provide our services.{'\n\n'}
            (This is a placeholder for the full Terms of Service.)
          </Typography>
        </ScrollView>
        <Button
          title="Close"
          onPress={() => router.back()}
          style={styles.closeButton}
        />
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  popup: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    marginBottom: 15,
    textAlign: 'center',
  },
  scroll: {
    marginBottom: 20,
  },
  text: {
    lineHeight: 24,
    color: Colors.text,
  },
  closeButton: {
    marginTop: 0,
  },
});
