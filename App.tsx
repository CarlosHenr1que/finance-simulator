import { ActivityIndicator, Appearance } from "react-native";

import { ThemeProvider } from "styled-components/native";

import light from "./src/styles/themes/light";
import dark from "./src/styles/themes/dark";

import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

import Routes from "./src/routes";
import AppProvider from "./src/contexts";
import { useState } from "react";

export default function App() {
  const deviceTheme = Appearance.getColorScheme();
  const [theme, _] = useState(deviceTheme);

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) return <ActivityIndicator size={"small"} />;

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}
