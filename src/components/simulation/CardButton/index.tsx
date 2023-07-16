import React from "react";
import { TouchableOpacity } from "react-native";

import Icon from "@expo/vector-icons/MaterialIcons";
import Box from "../../common/Box";
import Text from "../../common/Text";

interface CardButtonProps {
  title: string;
  description: string;
  onPress: () => void;
}

const CardButton: React.FC<CardButtonProps> = ({
  title,
  description,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ width: "100%" }}>
      <Box dir="column" width="100%" background="secondary" pd={16} radius={8}>
        <Box justify="space-between" mb={10}>
          <Text size={18} weight="bold" color="primary">
            {title}
          </Text>
          <Icon size={22} color="#000" name="keyboard-arrow-right" />
        </Box>
        <Text size={14} color="secondary">
          {description}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default CardButton;
