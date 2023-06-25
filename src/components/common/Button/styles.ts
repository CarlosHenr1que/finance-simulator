import styled from "styled-components/native";

interface ContainerProps {
  width?: number;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: ${(props) =>
    props.width
      ? props.width
      : props.theme.metrics.screenWidth -
        3 * props.theme.metrics.basePadding}px;
  height: 45px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.metrics.baseRadius}px;
  padding: ${({ theme }) => theme.metrics.basePadding}px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
`;
