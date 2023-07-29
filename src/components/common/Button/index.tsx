import React from "react";
import Text from "../Text";

import * as S from "./styles";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

interface Props {
  text: string;
  isLoading?: boolean;
  width?: number;
  height?: number;
  variant?: "primary" | "outline";
  onPress: () => void;
}

const Button: React.FC<Props> = ({
  text,
  isLoading = false,
  onPress,
  width,
  height,
  variant,
}) => {
  const { colors, textColors } = useTheme();

  return (
    <S.Container
      width={width}
      height={height}
      variant={variant}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text
          size={16}
          weight="bold"
          color={variant === "outline" ? colors.primary : textColors.white}
        >
          {text}
        </Text>
      )}
    </S.Container>
  );
};

export default Button;
