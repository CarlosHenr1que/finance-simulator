import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      background: string;
      primary: string;
      secondary: string;
    };

    textColors: {
      primary: string;
      secondary: string;
      placeHolder: string;
      white: string;
    };

    metrics: {
      baseMargin: number;
      basePadding: number;
      baseRadius: number;
      screenWidth: number;
      screenHeight: number;
    };

    font: {
      regular: string;
      bold: string;
    };
  }
}
