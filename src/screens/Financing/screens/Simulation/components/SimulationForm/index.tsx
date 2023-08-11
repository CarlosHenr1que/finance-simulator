import React, { useEffect, useState } from "react";

import { Controller } from "react-hook-form";
import Input from "@components/common/Input";

import Icon from "@expo/vector-icons/MaterialIcons";
import Box from "@components/common/Box";
import Button from "@components/common/Button";
import ToolTip from "@components/common/Input/ToolTip";

import {
  SimulateForm,
  useSimulateFinancingForm,
} from "../../../CreateSimulation/form";
import { Alert, ScrollView } from "react-native";
import { useFinancingSimulation } from "@contexts/financing/simulation";
import { calculateFinance } from "@utils/financing";

function useToolTip() {
  const [tips, setTollTips] = useState<{ [key: string]: boolean }>({} as any);

  const toggle = (name: string) => {
    setTollTips((previous) => {
      const copyPrevious = { ...previous };
      if (previous?.[name]) {
        delete copyPrevious?.[name];
        return copyPrevious;
      }
      copyPrevious[name] = true;
      return copyPrevious;
    });
  };
  return {
    tips,
    toggle,
  };
}

const SimulationForm: React.FC = ({}) => {
  const { tips, toggle } = useToolTip();
  const { data, addSimulation } = useFinancingSimulation();
  const [focusedInput, setFocusedInput] = useState("");
  const {
    control,
    onSubmit,
    formState: { errors },
    setValue,
  } = useSimulateFinancingForm(onSuccess);

  const onSavePress = async (values: SimulateForm) => {
    const installmentsObject = await calculateFinance(
      Number(values.financeValue),
      Number(values.downPayment),
      Number(values.installments),
      Number(values.fee),
      Number(values.valuationPercentage),
      data.simulation.constantAmortization
    );

    addSimulation({
      financing: Number(values.financeValue),
      downPayment: Number(values.downPayment),
      fee: Number(values.fee.replace(",", ".")),
      installmentsNumber: Number(values.installments),
      installments: installmentsObject,
      valuationPercentage: Number(
        values.valuationPercentage?.replace(",", ".")
      ),
    });

    Alert.alert("Dados alterados com sucesso");
  };

  function onSuccess(values: SimulateForm) {
    onSavePress(values);
  }

  useEffect(() => {
    const { simulation } = data;
    setValue("financeValue", String(simulation.financing));
    setValue("downPayment", String(simulation.downPayment));
    setValue("installments", String(simulation.installmentsNumber));
    setValue("fee", String(simulation.fee));
    setValue("valuationPercentage", String(simulation.valuationPercentage));
  }, []);

  return (
    <ScrollView>
      <Box dir="column" width="100%" mb={20} mt={20}>
        <Controller
          control={control}
          name="financeValue"
          render={({ field: { onChange, value, ref } }) => {
            if (focusedInput !== "" && focusedInput !== "financeValue")
              return <></>;

            return (
              <Input
                ref={ref}
                value={value}
                icon={<Icon name="monetization-on" color="#3DE8BF" size={22} />}
                placeholder="Valor total"
                mt={10}
                onChange={onChange}
                keyboardType="decimal-pad"
                error={errors.financeValue?.message}
                onFocus={(value) =>
                  setFocusedInput(value == true ? "financeValue" : "")
                }
              />
            );
          }}
        />

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
            />
          )}
        />

        <Controller
          control={control}
          name="installments"
          render={({ field: { onChange, value, ref } }) => (
            <>
              <Input
                ref={ref}
                value={value}
                icon={<Icon name="money-off" color="#000" size={22} />}
                placeholder="Prestações"
                mt={10}
                onChange={onChange}
                keyboardType="number-pad"
                error={errors.installments?.message}
                tollTip
                onToolTipPress={() => toggle("installments")}
              />
              {tips["installments"] && (
                <ToolTip
                  text="Sugestão para duração do financiamento: 360 meses"
                  onPress={() => {
                    onChange("360");
                  }}
                />
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="fee"
          render={({ field: { onChange, value, ref } }) => (
            <>
              <Input
                ref={ref}
                value={value}
                icon={<Icon name="money-off" color="#FF3642" size={22} />}
                placeholder="Juros (Anual)"
                mt={10}
                keyboardType="decimal-pad"
                onChange={onChange}
                error={errors.fee?.message}
                tollTip
                onToolTipPress={() => toggle("fee")}
              />
              {tips["fee"] && (
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

        <Controller
          control={control}
          name="valuationPercentage"
          render={({ field: { onChange, value, ref } }) => (
            <>
              <Input
                ref={ref}
                value={value}
                icon={<Icon name="money-off" color="#FF3642" size={22} />}
                placeholder="Percentual de valorização (Taxa anual)"
                mt={10}
                keyboardType="decimal-pad"
                onChange={onChange}
                error={errors.valuationPercentage?.message}
                tollTip
                onToolTipPress={() => toggle("valuation")}
              />
              {tips["valuation"] && (
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

        <Box mt={20}>
          <Button text="Salvar" onPress={onSubmit} />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default SimulationForm;
