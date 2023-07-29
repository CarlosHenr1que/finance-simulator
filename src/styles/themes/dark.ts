import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default {
  title: "default",

  colors: {
    background: "#000000",
    primary: "#1D0C82",
    secondary: "#0F0F0F",
    tertiary: "#0F0F0F",

    error: "#D30000",
  },

  textColors: {
    primary: "#FFFFFF",
    secondary: "#B9B9B9",
    placeHolder: "#8D8D8D",
    button: "#fff",
    white: "#fff",
    error: "#D30000",
  },

  metrics: {
    baseMargin: 10,
    basePadding: 8,
    baseRadius: 8,

    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
  },

  font: {
    regular: "Nunito_400Regular",
    bold: "Nunito_700Bold",
  },
};
