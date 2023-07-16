import React, { useState } from "react";

import * as S from "./styles";
import Box from "../Box";
import { Props as BoxProps } from "../Box";
import { KeyboardTypeOptions } from "react-native";
import Text from "../Text";

import Icon from "@expo/vector-icons/MaterialIcons";

import ReAnimated, {
  FadeInDown,
  FadeInLeft,
  FadeOutDown,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";
import { DefaultTheme } from "styled-components/native";

interface Props extends BoxProps {
  ref?: React.ForwardedRef<unknown>;
  icon?: any;
  value: string | undefined;
  error?: string | undefined;
  type?: "default" | "area";
  placeholder: string;
  tollTip?: boolean;
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
      tollTip,
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
      var color: keyof DefaultTheme["colors"] = "secondary";
      if (!!error) {
        color = "error";
      }

      if (isFocused) {
        color = "primary";
      }

      return color;
    };

    return (
      <Box width="100%" dir="column" {...rest}>
        <Box height={14} justify="space-between">
          {value && (
            <ReAnimated.View
              layout={Layout}
              entering={FadeInDown.duration(400)}
              exiting={FadeOutDown.duration(100)}
            >
              <Text size={12} color="secondary">
                {placeholder}
              </Text>
            </ReAnimated.View>
          )}

          {error && (
            <ReAnimated.View
              layout={Layout}
              entering={FadeInLeft.duration(400)}
              exiting={FadeOutLeft.duration(100)}
            >
              <Text size={12} color="error">
                {error}
              </Text>
            </ReAnimated.View>
          )}
        </Box>
        <Box
          width="100%"
          background="secondary"
          radius={8}
          px={16}
          borderWidth={2}
          borderColor={getBorderColor()}
          mt={8}
          justify="space-between"
          align="center"
        >
          <Box align="center">
            {icon && icon}
            <S.TextInput
              ref={ref}
              value={value}
              placeholder={placeholder}
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
          {tollTip && <Icon size={22} color="#06A5D8" name="info" />}
        </Box>
      </Box>
    );
  }
);

export default Input;
