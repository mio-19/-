import { Text, View } from "react-native";
import { Trans } from '@lingui/macro';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>
        <Trans>Edit app/index.tsx to edit this screen.</Trans>
      </Text>
    </View>
  );
}
