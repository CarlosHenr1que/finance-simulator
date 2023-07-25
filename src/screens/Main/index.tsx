import React from "react";

import Container from "@components/common/Container";
import Box from "@components/common/Box";
import Text from "@components/common/Text";
import Stack from "@components/common/Stack";
import CardButton from "@components/simulation/CardButton";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/app.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Main: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onFinancingPress = () => {
    navigation.navigate("Financing", {
      screen: "CreateSimulation",
    });
  };

  return (
    <Container>
      <Box dir="column" px={16} pt={60}>
        <Text size={24} weight="bold" color="primary">
          Bem vindo ao Simulador Financeiro
        </Text>
        <Text size={14} color="secondary">
          Utilize as opções abaixo para realizar sua simulação
        </Text>
        <Stack spacing={10} mt={30}>
          <CardButton
            title="Financiamento"
            description="Simule seu financiamento de forma rápida"
            onPress={onFinancingPress}
          />
        </Stack>
      </Box>
    </Container>
  );
};

export default Main;
