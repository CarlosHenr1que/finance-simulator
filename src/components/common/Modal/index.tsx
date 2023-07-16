import React, { ReactNode } from "react";
import { Modal, TouchableOpacity } from "react-native";

import Box from "../Box";

import Icon from "@expo/vector-icons/MaterialIcons";

interface BaseModalProps {
  children: ReactNode;
  visible: boolean;
  onClose: () => void;
}

const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  children,
  onClose,
}) => {
  const close = () => {
    onClose();
  };

  return (
    <Modal
      style={{ flex: 1, justifyContent: "flex-end" }}
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={close}
    >
      <Box flex={1}>
        <Box
          flex={1}
          dir="column"
          width="100%"
          background="background"
          pd={16}
          py={80}
        >
          <Box width="100%" justify="flex-end">
            <TouchableOpacity onPress={close}>
              <Icon name="close" size={22} color="#000" />
            </TouchableOpacity>
          </Box>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default BaseModal;
