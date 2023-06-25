import React, { useState } from "react";

import * as S from "./styles";
import Box from "../Box";
import { Props as BoxProps } from "../Box";
import { KeyboardTypeOptions } from "react-native";

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

    return (
      <Box
        background={"#fff"}
        radius={8}
        px={16}
        align="center"
        borderWidth={isFocused ? 2 : 0}
        borderColor={isFocused ? "#1D0C82" : "#fff"}
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
    );
  }
);

export default Input;
