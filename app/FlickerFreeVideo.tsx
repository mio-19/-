import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { Trans } from '@lingui/macro';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function FlickerFreeVideo() {
  const [powerFrequency, setPowerFrequency] = useState(50); // Default to 50 Hz
  const [frameRate, setFrameRate] = useState(24); // Default frame rate
  const [isCustomFrameRate, setIsCustomFrameRate] = useState(false);
  const [shutterAngle, setShutterAngle] = useState(0);
  const [shutterSpeed, setShutterSpeed] = useState('');

  // Common frame rates
  const commonFrameRates = [23.976, 24, 25, 29.97, 30, 50, 59.94, 60, 120];

  // Range for custom frame rate slider
  const minCustomFrameRate = 1;
  const maxCustomFrameRate = 240;

  useEffect(() => {
    calculateShutterValues();
  }, [powerFrequency, frameRate]);

  const calculateShutterValues = () => {
    if (!frameRate || frameRate <= 0) return;

    // Calculate flicker frequency (double the power frequency)
    const flickerFrequency = powerFrequency * 2;

    // Calculate safe shutter speed (in seconds)
    const safeShutterSpeed = 1 / flickerFrequency;

    // Calculate shutter angle
    const angle = safeShutterSpeed * frameRate * 360;
    setShutterAngle(Math.round(angle));

    // Format shutter speed as a fraction
    const denominator = Math.round(1 / safeShutterSpeed);
    setShutterSpeed(`1/${denominator} sec`);
  };

  const handleFrameRateChange = (value: number) => {
    setIsCustomFrameRate(false);
    setFrameRate(value);
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

      {/* Frame Rate Selection */}
      <View style={styles.pickerContainer}>
        <ThemedText style={styles.label}>
          <Trans>Select Frame Rate (fps):</Trans>
        </ThemedText>
        <Picker
          selectedValue={isCustomFrameRate ? 'custom' : frameRate}
          style={styles.picker}
          onValueChange={(value) => {
            if (value === 'custom') {
              setIsCustomFrameRate(true);
            } else {
              handleFrameRateChange(value);
            }
          }}
        >
          {commonFrameRates.map((rate) => (
            <Picker.Item key={rate} label={`${rate} fps`} value={rate} />
          ))}
          <Picker.Item label="Custom..." value="custom" />
        </Picker>
      </View>

      {/* Custom Frame Rate Input and Slider */}
      {isCustomFrameRate && (
        <View style={styles.customContainer}>
          <ThemedText style={styles.label}>
            <Trans>Enter Custom Frame Rate (fps):</Trans>
          </ThemedText>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="e.g., 48"
            value={frameRate.toString()}
            onChangeText={(text) => {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                setFrameRate(value);
              } else {
                setFrameRate(0);
              }
            }}
          />
          <Slider
            style={styles.slider}
            minimumValue={minCustomFrameRate}
            maximumValue={maxCustomFrameRate}
            step={1}
            value={frameRate}
            onValueChange={(value) => {
              setFrameRate(value);
            }}
          />
          <ThemedText style={styles.sliderValue}>
            <Trans>Selected Frame Rate:</Trans> {frameRate} fps
          </ThemedText>
        </View>
      )}

      {/* Display Calculated Values */}
      <View style={styles.resultsContainer}>
        {frameRate > 0 ? (
          <>
            <ThemedText style={styles.result}>
              <Trans>Safe Shutter Angle:</Trans> {shutterAngle}°
            </ThemedText>
            <ThemedText style={styles.result}>
              <Trans>Corresponding Shutter Speed:</Trans> {shutterSpeed}
            </ThemedText>
          </>
        ) : (
          <ThemedText style={styles.warning}>
            <Trans>Please enter a valid frame rate.</Trans>
          </ThemedText>
        )}
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
  customContainer: {
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
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  resultsContainer: {
    marginVertical: 32,
    alignItems: 'center',
  },
  result: {
    fontSize: 20,
    marginVertical: 8,
  },
  warning: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
