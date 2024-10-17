
import { View, Text } from 'react-native';
import { Trans } from '@lingui/macro';

export default function FlickerFreeVideo() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>
        <Trans>Flicker-free video utility coming soon.</Trans>
      </Text>
    </View>
  );
}