import styled, { DefaultTheme } from "styled-components/native";

type TextColor = keyof DefaultTheme["textColors"];
interface TextProps {
  size: number;
  weight?: "regular" | "bold";
  align?: "center" | "end" | "start";
  color?: TextColor | string;
}

export const Text = styled.Text<TextProps>`
  font-size: ${(props) => props.size}px;
  font-family: ${(props) =>
    props.theme.font[props.weight as "regular" | "bold"] ??
    props.theme.font[props.weight as "regular" | "bold"]};
  text-align: ${(props) => (props.align ? props.align : "left")};
  color: ${(props) =>
    props.theme.textColors[props.color as TextColor] ?? props.color};
`;
