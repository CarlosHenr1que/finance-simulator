import styled from "styled-components/native";

export const ContentWrapper = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background: ${(props) => props.theme.colors.background};
  max-width: 1366px;
`;
