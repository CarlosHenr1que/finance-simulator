import React, { ReactNode, useEffect, useState } from "react";
import Modal from "../../../../components/common/Modal";
import CardButton from "../../../../components/simulation/CardButton";
import Text from "../../../../components/common/Text";
import Box from "../../../../components/common/Box";
import Icon from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";

import ReAnimated, {
  FadeInRight,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";
import { useTheme } from "styled-components/native";
import Stack from "../../../../components/common/Stack";

interface Option {
  title: string;
  description: string;
  content: ReactNode;
}

interface OptionsModalProps {
  visible: boolean;
  title: string;
  options: Option[];
  onClose: () => void;
}

const OptionsModal: React.FC<OptionsModalProps> = ({
  visible,
  title,
  options,
  onClose,
}) => {
  const { colors, textColors } = useTheme();
  const [selectedOption, setSelectedOption] = useState<number>(-1);

  useEffect(() => {
    if (visible === false) {
      setSelectedOption(-1);
    }
  }, [visible]);

  const onCloseWrapper = () => {
    onClose();
    setSelectedOption(-1);
  };

  const currentOption = options[selectedOption];

  return (
    <Modal visible={visible} onClose={onCloseWrapper}>
      {selectedOption !== -1 ? (
        <TouchableOpacity
          onPress={() => {
            setSelectedOption(-1);
          }}
        >
          <Box width="100%" align="center" mb={20}>
            <Icon
              size={22}
              color={textColors.primary}
              name="keyboard-arrow-left"
            />
            <Text color="primary" size={24} weight="bold">
              {currentOption.title}
            </Text>
          </Box>
        </TouchableOpacity>
      ) : (
        <ReAnimated.View
          layout={Layout}
          entering={FadeInRight.duration(400)}
          exiting={FadeOutLeft.duration(100)}
        >
          <Box mb={20}>
            <Text color="primary" size={24} weight="bold">
              {title}
            </Text>
          </Box>
        </ReAnimated.View>
      )}
      {selectedOption !== -1 ? (
        <ReAnimated.View
          layout={Layout}
          entering={FadeInRight.duration(400)}
          exiting={FadeOutLeft.duration(100)}
        >
          {options[selectedOption].content}
        </ReAnimated.View>
      ) : (
        <Stack spacing={10}>
          {options.map((item, index) => (
            <CardButton
              key={String(index)}
              title={item.title}
              description={item.description}
              onPress={() => setSelectedOption(index)}
            />
          ))}
        </Stack>
      )}
    </Modal>
  );
};

export default OptionsModal;
