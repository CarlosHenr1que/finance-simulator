import React from "react";

import * as S from "./styles";
import Box from "../Box";

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <Box width="100%" justify="center" background="#fbfbfb">
      <S.ContentWrapper>{children}</S.ContentWrapper>
    </Box>
  );
};

export default Container;
