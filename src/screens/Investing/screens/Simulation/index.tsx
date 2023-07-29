import React from "react";
import Box from "@components/common/Box";
import Container from "@components/common/Container";
import Text from "@components/common/Text";
import Stack from "@components/common/Stack";
import { CardInformation } from "@components/simulation/CardInformation";

import Icon from "@expo/vector-icons/MaterialIcons";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";

import { useInvestingSimulation } from "@screens/Investing/contexts/simulation";
import { formatCurrency } from "@utils/currency";

import ReAnimated, { SlideInDown, Layout } from "react-native-reanimated";
import CardInstallment from "@components/simulation/CardInstallment";
import { ScrollView } from "react-native";

const Simulation: React.FC = () => {
  const {
    data: { simulation },
  } = useInvestingSimulation();
  return (
    <Container>
      <ScrollView>
        <Box dir="column" pt={60}>
          <Box dir="column" px={16}>
            <Box width="100%" justify="space-between">
              <Box dir="column">
                <Text color="primary" size={24} weight="bold">
                  {formatCurrency(simulation.balance)}
                </Text>
                <Text color="secondary" size={14}>
                  Saldo investimento
                </Text>
              </Box>
            </Box>

            <Stack spacing={10} mt={20}>
              <CardInformation
                icon={<MCIcon name="percent" color="#fff" size={22} />}
                title={String(simulation.fee + "%")}
                description="Taxa de juros (anual)"
                iconBackground="#000"
              />
              <CardInformation
                icon={<Icon name="payments" color="#fff" size={22} />}
                title={String(
                  formatCurrency(simulation.earnings.at(-1)?.profitAmount)
                )}
                description="Rendimento final"
                iconBackground="#3DE8BF"
              />
              {simulation.regularContribution !== 0 && (
                <CardInformation
                  icon={<MCIcon name="piggy-bank" color="#fff" size={22} />}
                  title={String(
                    formatCurrency(
                      simulation.regularContribution * simulation.duration
                    )
                  )}
                  description="Total em aportes"
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
            <Stack
              mt={20}
              spacing={10}
              px={16}
              pt={20}
              background="tertiary"
              radius={8}
            >
              {simulation.earnings.map((item, index: number) => (
                <CardInstallment
                  key={String(index)}
                  order={`${String(index + 1)}º`}
                  price={`${formatCurrency(item.currentBalance)}`}
                  debit={`${formatCurrency(item.profit)}`}
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
