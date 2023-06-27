import React, { useState } from "react";

import * as S from "./styles";
import Box from "../Box";
import { Props as BoxProps } from "../Box";
import { KeyboardTypeOptions } from "react-native";
import Text from "../Text";

import ReAnimated, {
  FadeInLeft,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";

interface Props extends BoxProps {
  ref?: React.ForwardedRef<unknown>;
  icon?: any;
  value: string | undefined;
  error?: string | undefined;
  type?: "default" | "area";
  placeholder: string;
  onChange: (text: string) => void;
  onFocus?: (isFocused: boolean) => void;
  onSubmitEditing?: () => void;
  keyboardType?: KeyboardTypeOptions;
}

const Input: React.FC<Props> = React.forwardRef(
  (
    {
      icon,
      value,
      error,
      placeholder,
      type = "default",
      onChange,
      onFocus,
      onSubmitEditing,
      keyboardType,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      onFocus && onFocus(true);

      setIsFocused(true);
    };

    const handleBlur = () => {
      onFocus && onFocus(false);
      setIsFocused(false);
    };

    const getBorderColor = () => {
      if (!!error) {
        return "#FF3642";
      }

      if (isFocused) {
        return "#1D0C82";
      }

      return "#fff";
    };

    return (
      <>
        <Box
          background={"#fff"}
          radius={8}
          px={16}
          align="center"
          borderWidth={2}
          borderColor={getBorderColor()}
          {...rest}
        >
          {icon && icon}
          <S.TextInput
            ref={ref}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={"#bcbcbc"}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={onChange}
            isFocused={isFocused}
            type={type}
            multiline={type === "area"}
            hasError={!!error}
            style={{ paddingLeft: 10, outline: "none" }}
            returnKeyType="done"
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType}
          />
        </Box>
        {error && (
          <ReAnimated.View
            layout={Layout}
            entering={FadeInLeft.duration(500)}
            exiting={FadeOutLeft.duration(100)}
          >
            <Box mt={4}>
              <Text size={12} color="error">
                {error}
              </Text>
            </Box>
          </ReAnimated.View>
        )}
      </>
    );
  }
);

export default Input;
