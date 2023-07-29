import React from "react";

import * as S from "./styles";
import Box from "../Box";
import { StatusBar } from "expo-status-bar";

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <Box flex={1} width="100%" justify="center" background="background">
      <StatusBar style="auto" />
      <S.ContentWrapper>{children}</S.ContentWrapper>
    </Box>
  );
};

export default Container;
