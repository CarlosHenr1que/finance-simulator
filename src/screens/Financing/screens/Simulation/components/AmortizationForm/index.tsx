import React, { useEffect } from "react";

import { Controller } from "react-hook-form";
import Input from "@components/common/Input";

import Icon from "@expo/vector-icons/MaterialIcons";
import Box from "@components/common/Box";
import Button from "@components/common/Button";
import ToolTip from "@components/common/Input/ToolTip";

import ReAnimated, {
  FadeInRight,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";
import {
  AmortizationForm as AmortizationFormProp,
  useAmortizationForm,
} from "./form";
import { useFinancingSimulation } from "@hooks/contexts/financing/simulation";

interface AmortizationModalProps {
  onSuccess: (values: AmortizationFormProp) => void;
}

const AmortizationForm: React.FC<AmortizationModalProps> = ({ onSuccess }) => {
  const {
    control,
    onSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useAmortizationForm(onSuccess);

  const { data } = useFinancingSimulation();

  useEffect(() => {
    setFocus("constantAmortization");
  }, []);

  useEffect(() => {
    setValue(
      "constantAmortization",
      String(data.simulation.constantAmortization ?? "")
    );
  }, []);

  return (
    <Box dir="column" width="100%">
      <ReAnimated.View
        layout={Layout}
        entering={FadeInRight.duration(400)}
        exiting={FadeOutLeft.duration(100)}
      >
        <Controller
          control={control}
          name="constantAmortization"
          render={({ field: { onChange, value, ref } }) => (
            <>
              <Input
                ref={ref}
                value={value}
                icon={<Icon name="money-off" color="#FF3642" size={22} />}
                placeholder="Amortização constante (Opcional)"
                keyboardType="decimal-pad"
                onChange={onChange}
                error={errors.constantAmortization?.message}
              />
              <ToolTip text="Insira o valor que você acredita que poderá amortizar todo mes assim finalizando seu financiamento em tempo menor" />
            </>
          )}
        />
      </ReAnimated.View>
      <Box mt={20}>
        <Button text="Amortizar" onPress={onSubmit} />
      </Box>
    </Box>
  );
};

export default AmortizationForm;
