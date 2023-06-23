import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Box from "./src/components/common/Box";

export default function App() {
  return (
    <View style={styles.container}>
      <Box>
        <Text>Open up App.tsx to start working on your app!</Text>
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
