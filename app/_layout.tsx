import { Stack } from "expo-router";
import { useColorScheme } from 'react-native';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import * as Localization from 'expo-localization';
// Import the compiled messages for your locales
import { messages as enNZMessages } from '../locales/en-NZ/messages';
import { messages as zhTWMessages } from '../locales/zh-TW/messages';
import { Colors } from '@/constants/Colors';

// Load messages for the supported locales
i18n.load('en-NZ', enNZMessages);
i18n.load('zh-TW', zhTWMessages);

// Get the device's preferred locales
const deviceLocales = Localization.getLocales();
let deviceLocale = 'zh-TW'; // Set a default locale

if (deviceLocales && deviceLocales.length > 0) {
  const localeCode = deviceLocales[0].languageTag;

  // Map device locale to supported locale
  if (localeCode.startsWith('en')) {
    deviceLocale = 'en-NZ';
  } else if (localeCode.startsWith('zh')) {
    deviceLocale = 'zh-TW';
  }
}

// Activate the appropriate locale
i18n.activate(deviceLocale);

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const screenOptions = {
    headerStyle: {
      backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
    },
    headerTintColor: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
    headerTitleStyle: {
      color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
    },
  };

  return (
    <I18nProvider i18n={i18n}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...screenOptions,
            title: '😿 Crying Cat',
          }}
        />
        <Stack.Screen
          name="FlickerFreeVideo"
          options={{
            ...screenOptions,
            title: 'Flicker-free Video',
          }}
        />
      </Stack>
    </I18nProvider>
  );
}
