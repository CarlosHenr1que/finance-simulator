import { ActivityIndicator } from "react-native";

import { ThemeProvider } from "styled-components/native";

import theme from "./src/styles/themes/default";

import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

import Financing from "./src/screens/Financing";
import Box from "./src/components/common/Box";

export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) return <ActivityIndicator size={"small"} />;

  return (
    <ThemeProvider theme={theme}>
      <Box width="100%" justify="center" background="#fbfbfb">
        <Financing />
      </Box>
    </ThemeProvider>
  );
}
