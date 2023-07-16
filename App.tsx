import { ActivityIndicator } from "react-native";

import { ThemeProvider } from "styled-components/native";

import theme from "./src/styles/themes/default";

import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

import Routes from "./src/routes";
import AppProvider from "./src/hooks/contexts";

export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) return <ActivityIndicator size={"small"} />;

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}
