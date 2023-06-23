import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Box from "./src/components/common/Box";

import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) return <ActivityIndicator size={"small"} />;

  return (
    <View style={styles.container}>
      <Box>
        <Text style={{ fontFamily: "Nunito_700Bold" }}>
          Open up App.tsx to start working on your app!
        </Text>
      </Box>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
