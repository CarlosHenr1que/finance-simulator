import React from "react";
import Text from "../Text";

import * as S from "./styles";
import { ActivityIndicator } from "react-native";

interface Props {
  text: string;
  isLoading?: boolean;
  width?: number;
  onPress: () => void;
}

const Button: React.FC<Props> = ({
  text,
  isLoading = false,
  onPress,
  width,
  ...rest
}) => {
  return (
    <S.Container width={width} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text size={16} weight="bold" color="white">
          {text}
        </Text>
      )}
    </S.Container>
  );
};

export default Button;
