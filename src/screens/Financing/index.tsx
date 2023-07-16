import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Box from "../../../src/components/common/Box";
import Text from "../../../src/components/common/Text";

import Container from "../../../src/components/common/Container";
import Input from "../../../src/components/common/Input";

import Icon from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { RootStackParamList } from "../../routes/app.routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { calculateFinance } from "../../utils/financing";
import { Controller } from "react-hook-form";

import { SimulateForm, useSimulateFinancingForm } from "./form";

import ReAnimated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";
import ToolTip from "../../components/common/Input/ToolTip";
import { useFinancingSimulation } from "../../hooks/contexts/financing/simulation";

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
    setFocus,
  } = useSimulateFinancingForm(handleSuccess);
  const [loading, setLoading] = useState(false);

  const { addSimulation } = useFinancingSimulation();

  const [isFeeTooTipVisible, setFeeTooTipVisible] = useState(true);
  const [isValuationToolTipVisible, setValuationTollTipVisible] =
    useState(true);

  const [step, setStep] = useState(0);

  type Steps = keyof SimulateForm;

  const steps: Steps[] = [
    "financeValue",
    "downPayment",
    "installments",
    "fee",
    "valuationPercentage",
  ];

  const nextStep = () => setStep((current) => current + 1);
  const previousStep = () => {
    setStep((current) => {
      const next = current - 1;
      console.log(steps[next]);
      setTimeout(() => {
        setFocus(steps[next]);
      }, 500);
      return next;
    });
  };

  async function onSimulatePress() {
    const currentValidation = steps[step];
    const isValid = await trigger([currentValidation]);
    if (isValid) {
      if (steps.length === step + 1) {
        onSubmit();
        return;
      }
      nextStep();
      steps[step + 1] && setFocus(steps[step + 1]);
    } else {
      console.log("aa");
      setTimeout(() => {
        setFocus(steps[step]);
      }, 500);
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
    } = values;
    const installmentsObject = await calculateFinance(
      Number(financeValue),
      Number(downPayment ?? 0),
      Number(installments),
      Number(fee.replace(",", ".")),
      Number(valuationPercentage ? valuationPercentage?.replace(",", ".") : 0),
      0
    );
    setLoading(false);

    addSimulation({
      financing: Number(financeValue),
      downPayment: Number(downPayment),
      fee: Number(fee.replace(",", ".")),
      installmentsNumber: Number(installments),
      installments: installmentsObject,
    });

    navigation.navigate("Simulation");
  }

  useEffect(() => {
    setFocus("financeValue");
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box flex={1} justify="flex-end" dir="column" px={16} pt={60}>
            <Text size={24} weight="bold" color="primary">
              Simular financiamento
            </Text>
            <Text size={14} color="secondary">
              Preencha as informações abaixo para simular seu financiamento.
            </Text>

            <Box width="100%" justify="flex-end" height={18} mt={20}>
              {step >= 1 && (
                <ReAnimated.View
                  layout={Layout}
                  entering={FadeInLeft.duration(400)}
                  exiting={FadeOutLeft.duration(100)}
                >
                  <TouchableOpacity onPress={previousStep}>
                    <Text color="primary" weight="bold" size={16}>
                      Voltar
                    </Text>
                  </TouchableOpacity>
                </ReAnimated.View>
              )}
            </Box>
            <Box dir="column" width="100%" mb={20} mt={20}>
              {step === 0 && (
                <Controller
                  control={control}
                  name="financeValue"
                  render={({ field: { onChange, value, ref } }) => (
                    <Input
                      ref={ref}
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
                      onSubmitEditing={onSimulatePress}
                    />
                  )}
                />
              )}

              {step === 1 && (
                <ReAnimated.View
                  layout={Layout}
                  entering={FadeInRight.duration(400)}
                  exiting={FadeOutLeft.duration(100)}
                >
                  <Controller
                    control={control}
                    name="downPayment"
                    render={({ field: { onChange, value, ref } }) => (
                      <Input
                        ref={ref}
                        value={value}
                        icon={<Icon name="money-off" color="#000" size={22} />}
                        placeholder="Entrada (Opcional)"
                        mt={10}
                        onChange={onChange}
                        keyboardType="number-pad"
                        error={errors.downPayment?.message}
                        onSubmitEditing={onSimulatePress}
                      />
                    )}
                  />
                </ReAnimated.View>
              )}

              {step === 2 && (
                <ReAnimated.View
                  layout={Layout}
                  entering={FadeInRight.duration(400)}
                  exiting={FadeOutLeft.duration(100)}
                >
                  <Controller
                    control={control}
                    name="installments"
                    render={({ field: { onChange, value, ref } }) => (
                      <>
                        <Input
                          ref={ref}
                          value={value}
                          icon={
                            <Icon name="money-off" color="#000" size={22} />
                          }
                          placeholder="Prestações"
                          mt={10}
                          onChange={onChange}
                          keyboardType="number-pad"
                          error={errors.installments?.message}
                          onSubmitEditing={onSimulatePress}
                        />
                        <ToolTip
                          text="Sugestão para duração do financiamento: 360 meses"
                          onPress={() => {
                            onChange("360");
                          }}
                        />
                      </>
                    )}
                  />
                </ReAnimated.View>
              )}

              {step === 3 && (
                <ReAnimated.View
                  layout={Layout}
                  entering={FadeInRight.duration(400)}
                  exiting={FadeOutLeft.duration(100)}
                >
                  <Controller
                    control={control}
                    name="fee"
                    render={({ field: { onChange, value, ref } }) => (
                      <>
                        <Input
                          ref={ref}
                          value={value}
                          icon={
                            <Icon name="money-off" color="#FF3642" size={22} />
                          }
                          placeholder="Juros (Anual)"
                          mt={10}
                          keyboardType="decimal-pad"
                          onChange={onChange}
                          error={errors.fee?.message}
                          onSubmitEditing={onSimulatePress}
                          tollTip
                        />
                        {isFeeTooTipVisible && (
                          <ToolTip
                            text="O juros médio para financiamento é de 9,33% ao ano, caso queria aplicar, pressione o botão ao lado ou insira o valor desejado"
                            onPress={() => {
                              onChange("9,33");
                            }}
                          />
                        )}
                      </>
                    )}
                  />
                </ReAnimated.View>
              )}

              {step === 4 && (
                <ReAnimated.View
                  layout={Layout}
                  entering={FadeInRight.duration(400)}
                  exiting={FadeOutLeft.duration(100)}
                >
                  <Controller
                    control={control}
                    name="valuationPercentage"
                    render={({ field: { onChange, value, ref } }) => (
                      <>
                        <Input
                          ref={ref}
                          value={value}
                          icon={
                            <Icon name="money-off" color="#FF3642" size={22} />
                          }
                          placeholder="Percentual de valorização (Taxa anual)"
                          mt={10}
                          keyboardType="decimal-pad"
                          onChange={onChange}
                          error={errors.valuationPercentage?.message}
                          onSubmitEditing={onSimulatePress}
                          tollTip
                        />
                        {isValuationToolTipVisible && (
                          <ToolTip
                            text="Indica o pertual de valorização do imóvel ao decorrer dos anos. O valor padrão é de 5%"
                            onPress={() => {
                              onChange("5");
                            }}
                          />
                        )}
                      </>
                    )}
                  />
                </ReAnimated.View>
              )}
            </Box>

            {step === steps.length - 1 && (
              <Button
                text={"Simular"}
                onPress={onSimulatePress}
                isLoading={loading}
              />
            )}
            <Box flex={1} />
          </Box>
        </TouchableWithoutFeedback>
      </Container>
    </>
  );
}
