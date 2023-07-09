import React from "react";
import * as S from "./styles";
import { DefaultTheme } from "styled-components/native";

export interface Props {
  children: React.ReactNode;
  size: number;
  weight?: "regular" | "bold";
  align?: "center" | "end" | "start" | "left" | "right";
  color?: keyof DefaultTheme["textColors"] | string;
}

const Text: React.FC<Props> = ({
  children,
  size,
  weight = "regular",
  align,
  color,
}) => {
  return (
    <S.Text size={size} weight={weight} align={align} color={color}>
      {children}
    </S.Text>
  );
};

export default Text;
