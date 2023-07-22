import React, { useState } from "react";

import Container from "../../components/common/Container";
import Text from "../../components/common/Text";
import Box from "../../components/common/Box";
import Button from "../../components/common/Button";
import { CardInformation } from "../../components/simulation/CardInformation";

import Icon from "@expo/vector-icons/MaterialIcons";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";
import Stack from "../../components/common/Stack";
import { ScrollView } from "react-native";
import CardInstallment from "../../components/simulation/CardInstallment";

import { formatCurrency } from "../../utils/currency";

import ReAnimated, { SlideInDown, Layout } from "react-native-reanimated";
import { getInstallmentItems } from "./utils";
import AmortizationForm from "./components/AmortizationForm";
import OptionsModal from "./components/OptionsModal";
import { AmortizationForm as AmortizationFormValues } from "./components/AmortizationForm/form";
import { calculateFinance } from "../../utils/financing";
import { useFinancingSimulation } from "../../hooks/contexts/financing/simulation";
import SimulationForm from "./components/SimulationForm";

const Simulation: React.FC = () => {
  const {
    data: { simulation },
    addSimulation,
  } = useFinancingSimulation();
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);

  const {
    financing,
    fee,
    installments,
    installmentsNumber,
    downPayment,
    valuationPercentage,
  } = simulation;

  const getFinancingValue = () => {
    if (downPayment) return formatCurrency(financing - downPayment);
    return formatCurrency(financing);
  };

  const handleAmortization = async (values: AmortizationFormValues) => {
    setIsOptionsModalVisible(false);

    const installmentsObject = await calculateFinance(
      financing,
      downPayment ?? 0,
      installmentsNumber,
      fee,
      valuationPercentage,
      Number(values.constantAmortization)
    );

    addSimulation({
      ...simulation,
      installments: installmentsObject,
      constantAmortization: Number(values.constantAmortization),
    });
  };

  const closeOptionModal = () => {
    setIsOptionsModalVisible(false);
  };

  return (
    <Container>
      <ScrollView>
        <OptionsModal
          visible={isOptionsModalVisible}
          title="Opções"
          options={[
            {
              title: "Alterar Informações",
              description: "Altere as informações do seu financiamento",
              content: <SimulationForm />,
            },
            {
              title: "Amortização",
              description: "Realizar amortização no seu financiamento",
              content: <AmortizationForm onSuccess={handleAmortization} />,
            },
          ]}
          onClose={closeOptionModal}
        />

        <Box dir="column" pt={60}>
          <Box dir="column" px={16}>
            <Box width="100%" justify="space-between">
              <Box dir="column">
                <Text color="primary" size={24} weight="bold">
                  {getFinancingValue()}
                </Text>
                <Text color="secondary" size={14}>
                  Valor financiado
                </Text>
              </Box>
              <Button
                width={80}
                text="Opções"
                onPress={() => setIsOptionsModalVisible(true)}
              />
            </Box>

            <Stack spacing={10} mt={20}>
              <CardInformation
                icon={<Icon name="payments" color="#fff" size={22} />}
                title={String(installmentsNumber)}
                description="Prestações"
                iconBackground="#000"
                items={getInstallmentItems(installments)}
              />
              <CardInformation
                icon={<MCIcon name="percent" color="#fff" size={22} />}
                title={String(fee).replace(".", ",") + "%"}
                description="Taxa de juros anual"
                iconBackground="#FF3642"
                items={[
                  {
                    title: "Total juros",
                    description: formatCurrency(
                      installments.at(-1)?.totalFee
                    ) as string,
                  },
                  {
                    title: "Total pago",
                    description: formatCurrency(
                      installments.at(-1)?.installmentAmount
                    ) as string,
                  },
                ]}
              />
              {downPayment && (
                <CardInformation
                  icon={<Icon name="payments" color="#fff" size={22} />}
                  title={formatCurrency(downPayment) as string}
                  description="Entrada"
                  iconBackground="#3DE8BF"
                />
              )}
              {!!installments?.at(-1)?.valuation && (
                <CardInformation
                  icon={<Icon name="trending-up" color="#fff" size={22} />}
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
            <Stack
              mt={20}
              spacing={10}
              px={16}
              pt={20}
              background="tertiary"
              radius={8}
            >
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
