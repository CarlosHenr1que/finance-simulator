import { TextInput } from "react-native";
import Box from "../../../src/components/common/Box";
import Text from "../../../src/components/common/Text";

import Container from "../../../src/components/common/Container";
import Input from "../../../src/components/common/Input";

import Icon from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";

export default function Financing() {
  const financeValueRef = useRef<TextInput>(null);
  const installmentsRef = useRef<TextInput>(null);
  const feeRef = useRef<TextInput>(null);

  const [financeValue, setFinanceValue] = useState("");
  const [installments, setInstallments] = useState("");
  const [fee, setFee] = useState("");

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
            keyboardType="number-pad"
            onChange={setFee}
          />
        </Box>
      </Container>
    </>
  );
}
