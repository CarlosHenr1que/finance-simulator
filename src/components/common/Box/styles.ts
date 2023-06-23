import styled from "styled-components/native";
import { Props } from ".";

const transformValue = (value: string | number) => {
  if (Number.isInteger(value)) {
    return `${value}px`;
  }

  return value;
};

export const Container = styled.View<Props>`
  height: ${({ height }) => (height ? transformValue(height) : "auto")};
  width: ${({ width }) => (width ? transformValue(width) : "auto")};

  ${(props) => props.pd && `padding: ${props.pd}px;`}
  ${(props) => props.px && `padding: 0px ${props.px}px;`}
  ${(props) => props.py && `padding: 0px; ${props.py}px;`}
  ${(props) => props.pl && `padding-left: ${props.pl}px;`}
  ${(props) => props.pr && `padding-left: ${props.pr}px;`}
  ${(props) => props.align && `align-items: ${props.align};`}
  ${(props) => props.justify && `justify-content: ${props.justify};`}
  

  ${(props) => props.mt && `margin-top: ${props.mt}px;`}
     ${(props) => props.ml && `margin-left: ${props.ml}px;`}
     ${(props) => props.mr && `margin-right: ${props.mr}px;`}
     ${(props) => props.mb && `margin-bottom: ${props.mb}px;`}

  flex-direction: ${(props) => props.dir};
  ${(props) => props.background && `background-color: ${props.background};`}
  ${(props) => props.radius && `border-radius: ${props.radius}px;`}
`;
