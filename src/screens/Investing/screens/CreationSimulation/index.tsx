import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Box from "@components/common/Box";
import Text from "@components/common/Text";

import Container from "@components/common/Container";
import Input from "@components/common/Input";

import Icon from "@expo/vector-icons/MaterialIcons";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";

import { useEffect, useState } from "react";
import Button from "@components/common/Button";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Controller } from "react-hook-form";

import { CreateInvestmentForm, useInvestmentCreationForm } from "./form";

import ReAnimated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";
import ToolTip from "@components/common/Input/ToolTip";
import { InvestingStackParamList } from "../../router";
import { calculateInvestment } from "@utils/investment";
import { useInvestingSimulation } from "@screens/Investing/contexts/simulation";

type InvestingNavigationProps = NativeStackScreenProps<
  InvestingStackParamList,
  "CreateSimulation"
>;
interface CreateSimulationProps extends InvestingNavigationProps {}

export default function CreateSimulation({
  navigation,
}: CreateSimulationProps) {
  const {
    control,
    onSubmit,
    formState: { errors },
    trigger,
    setFocus,
  } = useInvestmentCreationForm(handleSuccess);
  const [loading, setLoading] = useState(false);

  const { addSimulation } = useInvestingSimulation();

  const [step, setStep] = useState(0);

  type Steps = keyof CreateInvestmentForm;

  const steps: Steps[] = [
    "initialValue",
    "fee",
    "regularContribution",
    "duration",
  ];

  const nextStep = () => setStep((current) => current + 1);
  const previousStep = () => {
    setStep((current) => {
      const next = current - 1;
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
      setTimeout(() => {
        setFocus(steps[step]);
      }, 500);
    }
  }

  async function handleSuccess(values: CreateInvestmentForm) {
    setLoading(true);

    const { initialValue, fee, regularContribution, duration } = values;
    const investment = await calculateInvestment(
      Number(initialValue),
      Number(fee.replace(",", ".")),
      regularContribution ? Number(regularContribution) : 0,
      Number(duration)
    );

    addSimulation({
      initialValue: Number(initialValue),
      balance: investment.balance,
      duration: Number(duration),
      earnings: investment.installments,
      fee: Number(fee.replace(",", ".")),
      regularContribution: regularContribution
        ? Number(regularContribution)
        : 0,
    });

    setLoading(false);
    navigation.replace("Simulation");
  }

  useEffect(() => {
    setTimeout(() => {
      setFocus("initialValue");
    }, 500);
  }, []);

  return (
    <>
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box flex={1} justify="flex-end" dir="column" px={16} pt={60}>
            <Text size={24} weight="bold" color="primary">
              Simular Investimento
            </Text>
            <Text size={14} color="secondary">
              Preencha as informações abaixo para simular seu investimento
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
                  name="initialValue"
                  render={({ field: { onChange, value, ref } }) => (
                    <Input
                      ref={ref}
                      value={value}
                      icon={<Icon name="payments" color="#3DE8BF" size={22} />}
                      placeholder="Valor inicial"
                      mt={10}
                      onChange={onChange}
                      keyboardType="decimal-pad"
                      error={errors.initialValue?.message}
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
                    name="fee"
                    render={({ field: { onChange, value, ref } }) => (
                      <Input
                        ref={ref}
                        value={value}
                        icon={<MCIcon name="percent" color="#000" size={22} />}
                        placeholder="Taxa de juros (Anual)"
                        mt={10}
                        onChange={onChange}
                        keyboardType="decimal-pad"
                        error={errors.fee?.message}
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
                    name="regularContribution"
                    render={({ field: { onChange, value, ref } }) => (
                      <>
                        <Input
                          ref={ref}
                          value={value}
                          icon={
                            <MCIcon
                              name="piggy-bank"
                              color="#3DE8BF"
                              size={22}
                            />
                          }
                          placeholder="Aplicação mensal (Opcional)"
                          mt={10}
                          onChange={onChange}
                          keyboardType="number-pad"
                          error={errors.regularContribution?.message}
                          onSubmitEditing={onSimulatePress}
                        />
                        <ToolTip text="Caso deseje, insira um valor que sera aplicado todo mês no seu investimento" />
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
                    name="duration"
                    render={({ field: { onChange, value, ref } }) => (
                      <>
                        <Input
                          ref={ref}
                          value={value}
                          icon={
                            <Icon name="date-range" color="#3DE8BF" size={22} />
                          }
                          placeholder="Duração (Meses)"
                          mt={10}
                          keyboardType="decimal-pad"
                          onChange={onChange}
                          error={errors.duration?.message}
                          onSubmitEditing={onSimulatePress}
                          tollTip
                        />
                        <ToolTip text="Insira por quanto tempo deseja manter esse investimento" />
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
