import { StyleSheet } from 'react-native';
import { Trans } from '@lingui/macro';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function FlickerFreeVideo() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>
        <Trans>Flicker-free video utility coming soon.</Trans>
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});
