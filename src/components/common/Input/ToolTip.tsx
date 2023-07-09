import React from "react";

import Box from "../Box";

import { TouchableOpacity } from "react-native";
import Text from "../Text";
import Triangle from "../../../assets/triangle.svg";

import ReAnimated, {
  FadeInUp,
  FadeOutDown,
  Layout,
} from "react-native-reanimated";

import { useTheme } from "styled-components";

interface ToolTipProps {
  text: string;
  onPress?: () => void;
}

const ToolTip: React.FC<ToolTipProps> = ({ text, onPress }) => {
  const { colors } = useTheme();
  return (
    <ReAnimated.View
      layout={Layout}
      entering={FadeInUp.duration(1000)}
      exiting={FadeOutDown.duration(100)}
    >
      <Box dir="column" pd={16} background="tertiary" radius={8} mt={20}>
        <Triangle
          fill={colors.tertiary}
          style={{ position: "absolute", right: 16, top: -10 }}
        />
        <Box mb={10}>
          <Text color="secondary" size={12}>
            {text}
          </Text>
        </Box>
        {onPress && (
          <TouchableOpacity onPress={onPress}>
            <Text align="right" color="#06A5D8" size={14} weight="bold">
              Aplicar
            </Text>
          </TouchableOpacity>
        )}
      </Box>
    </ReAnimated.View>
  );
};

export default ToolTip;
