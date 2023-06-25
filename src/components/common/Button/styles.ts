import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: ${({ theme }) =>
    theme.metrics.screenWidth - 3 * theme.metrics.basePadding}px;
  height: 45px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.metrics.baseRadius}px;
  padding: ${({ theme }) => theme.metrics.basePadding}px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
`;
