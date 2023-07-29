import styled, { DefaultTheme, css } from "styled-components/native";

interface ContainerProps {
  width?: number;
  height?: number;
  variant?: "primary";
}

const variantStyles = (theme: DefaultTheme, variant = "primary") =>
  ({
    primary: css`
      background: ${theme.colors.primary};
      border-width: 1px;
    `,
    outline: css`
      background: ${theme.colors.background};
      border-color: ${theme.colors.primary};
      border-width: 1px;
    `,
  }[variant]);

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  height: ${(props) => (props.height ? `${props.height}px` : "45px;")};

  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.metrics.baseRadius}px;
  padding: ${({ theme }) => theme.metrics.basePadding}px;
  justify-content: center;
  align-items: center;

  ${({ theme, variant }) => variantStyles(theme, variant)}
`;
