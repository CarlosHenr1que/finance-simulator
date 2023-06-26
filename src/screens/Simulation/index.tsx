import React from "react";

import Container from "../../components/common/Container";
import Text from "../../components/common/Text";
import Box from "../../components/common/Box";
import Button from "../../components/common/Button";
import { CardInformation } from "../../components/simulation/CardInformation";

import Icon from "@expo/vector-icons/MaterialIcons";
import Stack from "../../components/common/Stack";

const Simulation: React.FC = () => {
  return (
    <Container>
      <Box dir="column" background="#FBFBFB" pt={90} px={16}>
        <Box width="100%" justify="space-between">
          <Box dir="column">
            <Text size={24} weight="bold">
              R$ 170.000,00
            </Text>
            <Text size={14}>Valor financiado</Text>
          </Box>
          <Button width={80} text="Opções" onPress={() => {}} />
        </Box>

        <Stack spacing={10} mt={20}>
          <CardInformation
            icon={<Icon name="monetization-on" color="#fff" size={22} />}
            title="9%"
            description="Taxa de juros anual"
            iconBackground="#FF3642"
          />
          <CardInformation
            icon={<Icon name="money-off" color="#fff" size={22} />}
            title="360"
            description="Prestações"
            iconBackground="#000"
          />
          <CardInformation
            icon={<Icon name="monetization-on" color="#fff" size={22} />}
            title="R$ 280.000,00"
            description="Valorização"
            iconBackground="#3DE8BF"
          />
        </Stack>
      </Box>
    </Container>
  );
};

export default Simulation;
