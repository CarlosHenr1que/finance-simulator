import React, { useState } from "react";

import ReAnimated, {
  SlideInDown,
  Layout,
  SlideOutDown,
  FadeInLeft,
  FadeOutLeft,
} from "react-native-reanimated";

import Box from "@components/common/Box";
import Container from "@components/common/Container";
import Text from "@components/common/Text";
import Stack from "@components/common/Stack";
import { CardInformation } from "@components/simulation/CardInformation";

import Icon from "@expo/vector-icons/MaterialIcons";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";

import { useInvestingSimulation } from "@screens/Investing/contexts/simulation";
import { formatCurrency } from "@utils/currency";

import CardInstallment from "@components/simulation/CardInstallment";
import Button from "@components/common/Button";
import { FlatList } from "react-native";
import { VictoryChart, VictoryTheme, VictoryBar } from "victory-native";
import { useTheme } from "styled-components";

const options = [
  { title: "Informações" },
  { title: "Parcelas" },
  { title: "Gráfico" },
];

const Simulation: React.FC = () => {
  const { colors } = useTheme();
  const {
    data: { simulation },
  } = useInvestingSimulation();

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const chartData = simulation.earnings.map((item) => item.currentBalance);
  const onSelectedOption = (option: (typeof options)[0]) => {
    setSelectedOption(option);
  };

  return (
    <Container>
      <Box flex={1} dir="column" pt={60}>
        <Box dir="column" px={16}>
          <Text color="primary" size={24} weight="bold">
            {formatCurrency(simulation.balance)}
          </Text>
          <Text color="secondary" size={14}>
            Saldo investimento
          </Text>
        </Box>
        <Box mt={20}>
          <FlatList
            horizontal
            ItemSeparatorComponent={() => <Box width={10} />}
            showsHorizontalScrollIndicator={false}
            data={options}
            renderItem={({ item, index }) => (
              <Box ml={index === 0 ? 16 : 0}>
                <Button
                  text={item.title}
                  width={120}
                  onPress={() => {
                    onSelectedOption(item);
                  }}
                  variant={
                    selectedOption.title === item.title ? "primary" : "outline"
                  }
                />
              </Box>
            )}
          />
        </Box>
        <Box flex={1} mt={20} px={16} py={20}>
          {selectedOption.title === "Informações" && (
            <Stack spacing={10}>
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
          )}

          {selectedOption.title === "Parcelas" && (
            <ReAnimated.View
              style={{ width: "100%" }}
              layout={Layout}
              entering={SlideInDown.duration(1000)}
              exiting={SlideOutDown.duration(1000)}
            >
              <FlatList
                data={simulation.earnings}
                ItemSeparatorComponent={() => <Box height={10} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 180 }}
                renderItem={({ item, index }) => (
                  <CardInstallment
                    key={String(index)}
                    order={`${String(index + 1)}º`}
                    price={`${formatCurrency(item.currentBalance)}`}
                    debit={`${formatCurrency(item.profit)}`}
                  />
                )}
              />
            </ReAnimated.View>
          )}

          {selectedOption.title === "Gráfico" && (
            <ReAnimated.View
              layout={Layout}
              entering={FadeInLeft.duration(1000)}
              exiting={FadeOutLeft.duration(100)}
            >
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryBar
                  style={{ data: { fill: colors.primary } }}
                  data={chartData}
                  x="month"
                  y="balance"
                />
              </VictoryChart>
            </ReAnimated.View>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Simulation;
