import styled from "styled-components/native";

export const TextInput = styled.TextInput.attrs((props) => ({
  placeholderTextColor: props.theme.textColors.placeHolder,
}))`
  flex: 1;
  height: 45px;
  color: ${(props) => props.theme.textColors.primary};
`;
