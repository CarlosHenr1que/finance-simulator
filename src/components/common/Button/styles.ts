import styled from "styled-components/native";

interface ContainerProps {
  width?: number;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  height: 45px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.metrics.baseRadius}px;
  padding: ${({ theme }) => theme.metrics.basePadding}px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
`;
