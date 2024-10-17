import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Import the compiled messages for the default locale
import { messages as enNZMessages } from '../locales/en-NZ/messages';
import { messages as zhTWMessages } from '../locales/zh-TW/messages';

// Load messages and activate the default locale
i18n.load('en-NZ', enNZMessages);
i18n.load('zh-TW', zhTWMessages);
i18n.activate('zh-TW');

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    // Add `i18n` to the dependency array if you're dynamically changing locales
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <I18nProvider i18n={i18n}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </I18nProvider>
  );
}
