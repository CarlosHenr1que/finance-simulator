import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default {
  title: "default",

  colors: {
    background: "#fbfbfb",
    primary: "#1D0C82",
    secondary: "#ffffff",
  },

  textColors: {
    primary: "#000000",
    secondary: "#484848",
    placeHolder: "#8D8D8D",
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
