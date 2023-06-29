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

import ReAnimated, { SlideInDown, Layout } from "react-native-reanimated";

type FinancingNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Simulation"
>;
interface SimulationProps extends FinancingNavigationProps {}

const Simulation: React.FC<SimulationProps> = ({ route }) => {
  const { financing, fee, installments, installmentsNumber, downPayment } =
    route.params.simulation;

  const getFinancingValue = () => {
    if (downPayment) return formatCurrency(financing - downPayment);
    return formatCurrency(financing);
  };

  const formatMonthToDuration = (value: number) => {
    const [years, months] = String(value / 12).split(".");

    if (months) {
      return `${years} Anos ${months[0]} meses`;
    }
    return `${years} Anos`;
  };

  return (
    <Container>
      <ScrollView>
        <Box dir="column" background="#FBFBFB" pt={30}>
          <Box dir="column" px={16}>
            <Box width="100%" justify="space-between">
              <Box dir="column">
                <Text size={24} weight="bold">
                  {getFinancingValue()}
                </Text>
                <Text size={14}>Valor financiado</Text>
              </Box>
              <Button width={80} text="Opções" onPress={() => {}} />
            </Box>

            <Stack spacing={10} mt={20}>
              <CardInformation
                icon={<Icon name="money-off" color="#fff" size={22} />}
                title={String(installmentsNumber)}
                description="Prestações"
                iconBackground="#000"
                items={[
                  {
                    title: formatMonthToDuration(installments.length),
                    description: "Duração",
                  },
                  {
                    title: String(installments.length),
                    description: "Pagas",
                  },
                  {
                    title: formatCurrency(
                      installments.at(-1)?.installment
                    ) as string,
                    description: "Ultima",
                  },
                ]}
              />
              <CardInformation
                icon={<Icon name="monetization-on" color="#fff" size={22} />}
                title={String(fee).replace(".", ",") + "%"}
                description="Taxa de juros anual"
                iconBackground="#FF3642"
              />
              {downPayment && (
                <CardInformation
                  icon={<Icon name="monetization-on" color="#fff" size={22} />}
                  title={formatCurrency(downPayment) as string}
                  description="Entrada"
                  iconBackground="#3DE8BF"
                />
              )}
              {installments?.at(-1)?.valuation !== undefined && (
                <CardInformation
                  icon={<Icon name="monetization-on" color="#fff" size={22} />}
                  title={
                    formatCurrency(installments?.at(-1)?.valuation) as string
                  }
                  description="Valorização"
                  iconBackground="#3DE8BF"
                />
              )}
            </Stack>
          </Box>
          <ReAnimated.View
            style={{ width: "100%" }}
            layout={Layout}
            entering={SlideInDown.duration(1000)}
          >
            <Stack mt={20} spacing={10} px={16} pt={20} background="#F2F2F2">
              {installments.map((item: any, index: number) => (
                <CardInstallment
                  key={String(index)}
                  order={`${String(index + 1)}º`}
                  price={`${formatCurrency(item.installment)}`}
                  debit={`${formatCurrency(item.debit)}`}
                />
              ))}
            </Stack>
          </ReAnimated.View>
        </Box>
      </ScrollView>
    </Container>
  );
};

export default Simulation;
