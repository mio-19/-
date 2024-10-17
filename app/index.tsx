import { StyleSheet, View, ScrollView, useColorScheme } from "react-native";
import { Link } from 'expo-router';
import { Trans } from '@lingui/macro';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { t } from "@lingui/macro";
import { CryingCatAnimation } from '@/components/CryingCatAnimation';

const utilities = [
  { name: t`Flicker-free video`, route: "/FlickerFreeVideo" },
];

export default function Index() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <CryingCatAnimation />
          <ThemedText type="title" style={styles.title}>
            <Trans>Welcome to Crying Cat</Trans>
          </ThemedText>
        </View>
        
        <ThemedText type="subtitle" style={styles.subtitle}>
          <Trans>Available Utilities</Trans>
        </ThemedText>
        
        {utilities.map((utility, index) => (
          <Link key={index} href={utility.route} style={styles.link}>
            <ThemedText 
              type="link" 
              style={[
                styles.linkText,
                { color: colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint }
              ]}
            >
              {utility.name}
            </ThemedText>
          </Link>
        ))}
        
        <ThemedText style={styles.description}>
          <Trans>Choose a utility from the list above to get started.</Trans>
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  subtitle: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginVertical: 8,
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  linkText: {
    fontSize: 18,
  },
  description: {
    marginTop: 20,
    textAlign: 'center',
  },
});
