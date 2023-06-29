import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
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
import { Controller } from "react-hook-form";

import { SimulateForm, useSimulateFinancingForm } from "./form";

import ReAnimated, {
  FadeInLeft,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";

type FinancingNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Financing"
>;
interface FinancingProps extends FinancingNavigationProps {}

export default function Financing({ navigation }: FinancingProps) {
  const {
    control,
    onSubmit,
    formState: { errors },
    trigger,
  } = useSimulateFinancingForm(handleSuccess);

  const financeValueRef = useRef<TextInput>(null);
  const installmentsRef = useRef<TextInput>(null);
  const feeRef = useRef<TextInput>(null);
  const valuationRef = useRef<TextInput>(null);
  const downPaymentRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(0);

  const nextStep = () => setStep((current) => current + 1);
  const previousStep = () => setStep((current) => current - 1);

  async function onSimulatePress() {
    switch (step) {
      case 0:
        const ok = await trigger([
          "financeValue",
          "downPayment",
          "installments",
        ]);
        if (ok) {
          nextStep();
        }
        break;
      case 1:
        if (
          await trigger(["fee", "valuationPercentage", "constantAmortization"])
        ) {
          onSubmit();
        }
    }
  }

  async function handleSuccess(values: SimulateForm) {
    setLoading(true);
    const {
      financeValue,
      installments,
      fee,
      valuationPercentage,
      downPayment,
      constantAmortization,
    } = values;
    const installmentsObject = await calculateFinance(
      Number(financeValue),
      Number(downPayment ?? 0),
      Number(installments),
      Number(fee.replace(",", ".")),
      Number(valuationPercentage ? valuationPercentage?.replace(",", ".") : 0),
      Number(constantAmortization ?? 0)
    );
    setLoading(false);

    navigation.navigate("Simulation", {
      simulation: {
        financing: Number(financeValue),
        downPayment: Number(downPayment),
        fee: Number(fee.replace(",", ".")),
        installmentsNumber: Number(installments),
        installments: installmentsObject,
      },
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <StatusBar style="auto" />
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box flex={1} justify="flex-end" dir="column" px={16} pt={30}>
            <Text size={24} weight="bold">
              Simular financiamento
            </Text>
            <Text size={14} color="secondary">
              Preencha as informações abaixo para simular seu financiamento.
            </Text>

            <Box width="100%" justify="flex-end" height={16}>
              {step === 1 && (
                <ReAnimated.View
                  layout={Layout}
                  entering={FadeInLeft.duration(400)}
                  exiting={FadeOutLeft.duration(100)}
                >
                  <TouchableOpacity onPress={previousStep}>
                    <Text weight="bold" size={16}>
                      Voltar
                    </Text>
                  </TouchableOpacity>
                </ReAnimated.View>
              )}
            </Box>
            <Box dir="column" width="100%" mb={20} mt={20}>
              {step === 0 && (
                <>
                  <Controller
                    control={control}
                    name="financeValue"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        ref={financeValueRef}
                        value={value}
                        icon={
                          <Icon
                            name="monetization-on"
                            color="#3DE8BF"
                            size={22}
                          />
                        }
                        placeholder="Valor financiado"
                        mt={10}
                        onChange={onChange}
                        keyboardType="decimal-pad"
                        error={errors.financeValue?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="downPayment"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        ref={downPaymentRef}
                        value={value}
                        icon={<Icon name="money-off" color="#000" size={22} />}
                        placeholder="Entrada"
                        mt={10}
                        onChange={onChange}
                        keyboardType="number-pad"
                        error={errors.downPayment?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="installments"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        ref={installmentsRef}
                        value={value}
                        icon={<Icon name="money-off" color="#000" size={22} />}
                        placeholder="Prestações"
                        mt={10}
                        onChange={onChange}
                        keyboardType="number-pad"
                        error={errors.installments?.message}
                      />
                    )}
                  />
                </>
              )}

              {step === 1 && (
                <>
                  <Controller
                    control={control}
                    name="fee"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        ref={feeRef}
                        value={value}
                        icon={
                          <Icon name="money-off" color="#FF3642" size={22} />
                        }
                        placeholder="Juros (Anual)"
                        mt={10}
                        keyboardType="decimal-pad"
                        onChange={onChange}
                        error={errors.fee?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="valuationPercentage"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        ref={valuationRef}
                        value={value}
                        icon={
                          <Icon name="money-off" color="#FF3642" size={22} />
                        }
                        placeholder="Percentual de valorização (Taxa anual)"
                        mt={10}
                        keyboardType="decimal-pad"
                        onChange={onChange}
                        error={errors.valuationPercentage?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="constantAmortization"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        ref={valuationRef}
                        value={value}
                        icon={
                          <Icon name="money-off" color="#FF3642" size={22} />
                        }
                        placeholder="Amortização constante (Opcional)"
                        mt={10}
                        keyboardType="decimal-pad"
                        onChange={onChange}
                        error={errors.constantAmortization?.message}
                      />
                    )}
                  />
                </>
              )}
            </Box>

            <Button
              text={step === 0 ? "Proximo" : "Simular"}
              onPress={onSimulatePress}
              isLoading={loading}
            />
            <Box flex={1} />
          </Box>
        </TouchableWithoutFeedback>
      </Container>
    </KeyboardAvoidingView>
  );
}
