import { TextInput } from "react-native";
import Box from "../../../src/components/common/Box";
import Text from "../../../src/components/common/Text";

import Container from "../../../src/components/common/Container";
import Input from "../../../src/components/common/Input";

import Icon from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import Button from "../../components/common/Button";
import { RootStackParamList } from "../../routes/app.routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { calculateFinance } from "../../utils/financing";

type FinancingNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Financing"
>;
interface FinancingProps extends FinancingNavigationProps {}

export default function Financing({ navigation }: FinancingProps) {
  const financeValueRef = useRef<TextInput>(null);
  const installmentsRef = useRef<TextInput>(null);
  const feeRef = useRef<TextInput>(null);

  const [financeValue, setFinanceValue] = useState("");
  const [installments, setInstallments] = useState("");
  const [loading, setLoading] = useState(false);
  const [fee, setFee] = useState("");

  const onSimulatePress = async () => {
    setLoading(true);
    const installmentsObject = await calculateFinance(
      Number(financeValue),
      Number(installments),
      Number(fee.replace(",", "."))
    );
    setLoading(false);

    navigation.navigate("Simulation", {
      simulation: {
        financing: Number(financeValue),
        fee: Number(fee.replace(",", ".")),
        installmentsNumber: Number(installments),
        installments: installmentsObject,
      },
    });
  };

  return (
    <>
      <StatusBar style="auto" />
      <Container>
        <Box dir="column" px={16} pt={90}>
          <Text size={24} weight="bold">
            Simular financiamento
          </Text>
          <Text size={14} color="secondary">
            Preencha as informações abaixo para simular seu financiamento.
          </Text>
          <Input
            ref={financeValueRef}
            value={financeValue}
            icon={<Icon name="monetization-on" color="#3DE8BF" size={22} />}
            placeholder="Valor financiado"
            mt={10}
            onChange={setFinanceValue}
            onSubmitEditing={() => installmentsRef.current?.focus()}
            keyboardType="decimal-pad"
          />
          <Input
            ref={installmentsRef}
            value={installments}
            icon={<Icon name="money-off" color="#000" size={22} />}
            placeholder="Prestações"
            mt={10}
            onChange={setInstallments}
            onSubmitEditing={() => feeRef.current?.focus()}
            keyboardType="number-pad"
          />
          <Input
            ref={feeRef}
            value={fee}
            icon={<Icon name="money-off" color="#FF3642" size={22} />}
            placeholder="Juros (Anual)"
            mt={10}
            mb={20}
            keyboardType="decimal-pad"
            onChange={setFee}
          />
          <Button
            text="Simular"
            onPress={onSimulatePress}
            isLoading={loading}
          />
        </Box>
      </Container>
    </>
  );
}
