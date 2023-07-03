import styled, { DefaultTheme } from "styled-components/native";
import { Props } from ".";

const transformValue = (value: string | number) => {
  if (Number.isInteger(value)) {
    return `${value}px`;
  }

  return value;
};

type Colors = keyof DefaultTheme["colors"];

export const Container = styled.View<Props>`
  ${(props) => props.flex && `flex: ${props.flex};`}

  height: ${({ height }) => (height ? transformValue(height) : "auto")};
  width: ${({ width }) => (width ? transformValue(width) : "auto")};

  ${(props) => props.pd && `padding: ${props.pd}px;`}
  ${(props) => props.pl && `padding-left: ${props.pl}px;`}
  ${(props) => props.pr && `padding-left: ${props.pr}px;`}
  ${(props) => props.pt && `padding-top: ${props.pt}px;`}
  ${(props) => props.pb && `padding-bottom: ${props.pb}px;`}
  

  ${(props) => props.px && `padding-left: ${props.px}px;`}
  ${(props) => props.px && `padding-right: ${props.px}px;`}
  ${(props) => props.py && `padding-top: ${props.py}px;`}
  ${(props) => props.py && `padding-bottom: ${props.py}px;`}
  
  ${(props) => props.align && `align-items: ${props.align};`}
  ${(props) => props.justify && `justify-content: ${props.justify};`}
  

  ${(props) => props.mt && `margin-top: ${props.mt}px;`}
     ${(props) => props.ml && `margin-left: ${props.ml}px;`}
     ${(props) => props.mr && `margin-right: ${props.mr}px;`}
     ${(props) => props.mb && `margin-bottom: ${props.mb}px;`}

  flex-direction: ${(props) => props.dir};
  ${(props) =>
    props.theme.colors[props.background as keyof DefaultTheme["colors"]]
      ? `background-color: ${props.theme.colors[props.background as Colors]};`
      : `background-color: ${props.background};`}

  ${(props) => props.radius && `border-radius: ${props.radius}px;`}
  

  ${(props) =>
    props.theme.colors[props.borderColor as Colors]
      ? `border-color: ${props.theme.colors[props.borderColor as Colors]};`
      : `border-color: ${props.borderColor};`}
  
  ${(props) => props.borderWidth && `border-width: ${props.borderWidth}px;`}
`;
