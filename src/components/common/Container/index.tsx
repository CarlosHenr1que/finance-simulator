import React from "react";

import * as S from "./styles";

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return <S.ContentWrapper>{children}</S.ContentWrapper>;
};

export default Container;
