import React from "react";

import { Container } from "./styles";
import { DefaultTheme } from "styled-components/native";

export interface Props {
  flex?: number;
  children?: React.ReactNode;
  width?: string | number;
  height?: number;
  pd?: number;
  px?: number;
  py?: number;
  pl?: number;
  pr?: number;
  pt?: number;
  pb?: number;
  dir?: "row" | "column";
  background?: keyof DefaultTheme["colors"] | string;
  align?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  justify?: string;
  mt?: number;
  ml?: number;
  mr?: number;
  mb?: number;
  radius?: number;
  borderColor?: keyof DefaultTheme["colors"] | string;
  borderWidth?: number;
}

const Box: React.FC<Props> = ({
  children,
  flex,
  width,
  height,
  pd,
  px,
  py,
  pl,
  dir = "row",
  background,
  align,
  justify,
  pr,
  pt,
  pb,
  mt,
  ml,
  mr,
  mb,
  radius,
  borderColor,
  borderWidth,
}) => {
  return (
    <Container
      flex={flex}
      width={width}
      height={height}
      pd={pd}
      px={px}
      py={py}
      pl={pl}
      dir={dir}
      align={align}
      background={background}
      justify={justify}
      pr={pr}
      pt={pt}
      pb={pb}
      mt={mt}
      ml={ml}
      mr={mr}
      mb={mb}
      radius={radius}
      borderColor={borderColor}
      borderWidth={borderWidth}
    >
      {children}
    </Container>
  );
};

export default Box;
