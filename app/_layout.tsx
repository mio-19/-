import { Stack } from "expo-router";

import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import * as Localization from 'expo-localization';
// Import the compiled messages for your locales
import { messages as enNZMessages } from '../locales/en-NZ/messages';
import { messages as zhTWMessages } from '../locales/zh-TW/messages';

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
  return (
    <I18nProvider i18n={i18n}>
      <Stack>
        <Stack.Screen name="index" options={{ title: '😿 Crying Cat' }} />
      </Stack>
    </I18nProvider>
  );
}
