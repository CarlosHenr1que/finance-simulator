import styled, { DefaultTheme } from "styled-components/native";

interface TextProps {
  size: number;
  weight?: "regular" | "bold";
  align?: "center" | "end" | "start";
  color?: keyof DefaultTheme["textColors"];
}

export const Text = styled.Text<TextProps>`
  font-size: ${(props) => props.size}px;
  font-family: ${(props) =>
    props.theme.font[props.weight as "regular" | "bold"] ??
    props.theme.font[props.weight as "regular" | "bold"]};
  text-align: ${(props) => (props.align ? props.align : "left")};
  color: ${(props) =>
    props.color
      ? props.theme.textColors[props.color]
      : props.theme.textColors.primary};
`;
