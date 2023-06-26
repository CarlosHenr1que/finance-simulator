import React from "react";

import Container from "../../components/common/Container";
import Text from "../../components/common/Text";
import Box from "../../components/common/Box";
import Button from "../../components/common/Button";
import { CardInformation } from "../../components/simulation/CardInformation";

import Icon from "@expo/vector-icons/MaterialIcons";
import Stack from "../../components/common/Stack";
import { ScrollView } from "react-native";
import CardInstallment from "../../components/simulation/CardInstallment";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/app.routes";
import { formatCurrency } from "../../utils/currency";

type FinancingNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Simulation"
>;
interface SimulationProps extends FinancingNavigationProps {}

const Simulation: React.FC<SimulationProps> = ({ route }) => {
  const { financing, fee, installments, installmentsNumber } =
    route.params.simulation;
  return (
    <Container>
      <ScrollView>
        <Box dir="column" background="#FBFBFB" pt={90}>
          <Box dir="column" px={16}>
            <Box width="100%" justify="space-between">
              <Box dir="column">
                <Text size={24} weight="bold">
                  {formatCurrency(financing)}
                </Text>
                <Text size={14}>Valor financiado</Text>
              </Box>
              <Button width={80} text="Opções" onPress={() => {}} />
            </Box>

            <Stack spacing={10} mt={20}>
              <CardInformation
                icon={<Icon name="monetization-on" color="#fff" size={22} />}
                title={String(fee).replace(".", ",") + "%"}
                description="Taxa de juros anual"
                iconBackground="#FF3642"
              />
              <CardInformation
                icon={<Icon name="money-off" color="#fff" size={22} />}
                title={String(installmentsNumber)}
                description="Prestações"
                iconBackground="#000"
              />
              {/* <CardInformation
                icon={<Icon name="monetization-on" color="#fff" size={22} />}
                title="R$ 280.000,00"
                description="Valorização"
                iconBackground="#3DE8BF"
              /> */}
            </Stack>
          </Box>
          <Stack mt={20} spacing={10} px={16} pt={20} background="#F2F2F2">
            {installments.map((item: any, index: number) => (
              <CardInstallment
                order={`${String(index + 1)}º`}
                price={`${formatCurrency(item.installment)}`}
                debit={`${formatCurrency(item.debit)}`}
              />
            ))}
          </Stack>
        </Box>
      </ScrollView>
    </Container>
  );
};

export default Simulation;
