import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { Trans } from '@lingui/macro';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function FlickerFreeVideo() {
  const [powerFrequency, setPowerFrequency] = useState(50); // Default to 50 Hz
  const [frameRate, setFrameRate] = useState(24); // Default frame rate
  const [shutterAngle, setShutterAngle] = useState(0);
  const [shutterSpeed, setShutterSpeed] = useState('');

  useEffect(() => {
    calculateShutterValues();
  }, [powerFrequency, frameRate]);

  const calculateShutterValues = () => {
    // Calculate flicker frequency (double the power frequency)
    const flickerFrequency = powerFrequency * 2;

    // Calculate safe shutter speed (in seconds)
    const safeShutterSpeed = 1 / flickerFrequency;

    // Calculate shutter angle
    const angle = (safeShutterSpeed * frameRate * 360);
    setShutterAngle(Math.round(angle));

    // Format shutter speed as a fraction
    const denominator = Math.round(1 / safeShutterSpeed);
    setShutterSpeed(`1/${denominator} sec`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>
        <Trans>Flicker-Free Video Calculator</Trans>
      </ThemedText>

      {/* Power Frequency Selection */}
      <View style={styles.pickerContainer}>
        <ThemedText style={styles.label}>
          <Trans>Select Power Frequency (Hz):</Trans>
        </ThemedText>
        <Picker
          selectedValue={powerFrequency}
          style={styles.picker}
          onValueChange={(value) => setPowerFrequency(value)}
        >
          <Picker.Item label="50 Hz" value={50} />
          <Picker.Item label="60 Hz" value={60} />
        </Picker>
      </View>

      {/* Frame Rate Slider */}
      <View style={styles.sliderContainer}>
        <ThemedText style={styles.label}>
          <Trans>Frame Rate: {frameRate} fps</Trans>
        </ThemedText>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={120}
          step={1}
          value={frameRate}
          onValueChange={(value) => setFrameRate(value)}
        />
      </View>

      {/* Display Calculated Values */}
      <View style={styles.resultsContainer}>
        <ThemedText style={styles.result}>
          <Trans>Safe Shutter Angle:</Trans> {shutterAngle}°
        </ThemedText>
        <ThemedText style={styles.result}>
          <Trans>Corresponding Shutter Speed:</Trans> {shutterSpeed}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 16,
  },
  pickerContainer: {
    marginVertical: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  sliderContainer: {
    marginVertical: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  resultsContainer: {
    marginVertical: 32,
    alignItems: 'center',
  },
  result: {
    fontSize: 20,
    marginVertical: 8,
  },
});
