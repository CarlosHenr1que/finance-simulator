import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

export interface SimulateForm {
  financeValue: string;
  installments: string;
  fee: string;
  valuationPercentage?: string;
  downPayment?: string;
  constantAmortization?: string;
}

const validations = {
  nonZero: {
    name: "non-zero",
    message: "Deve ser maior que zero",
    test: (value: string | undefined) => {
      if (value !== undefined && value !== "") {
        return Number(value?.replace(",", ".")) > 0;
      }
      return true;
    },
  },
};

const { nonZero } = validations;
const simulationFormSchema: yup.ObjectSchema<SimulateForm> = yup.object({
  financeValue: yup
    .string()
    .test(nonZero.name, nonZero.message, nonZero.test)
    .required("Este campo deve ser preenchido"),
  downPayment: yup.string().test(nonZero.name, nonZero.message, nonZero.test),
  installments: yup
    .string()
    .test(nonZero.name, nonZero.message, nonZero.test)
    .required("Este campo deve ser preenchido"),
  fee: yup
    .string()
    .test(nonZero.name, nonZero.message, nonZero.test)
    .required("Este campo deve ser preenchido"),
  valuationPercentage: yup
    .string()
    .test(nonZero.name, nonZero.message, nonZero.test),
  constantAmortization: yup
    .string()
    .test(nonZero.name, nonZero.message, nonZero.test),
});

export const useSimulateFinancingForm = (
  onSuccess: (values: SimulateForm) => void
) => {
  const { handleSubmit, ...form } = useForm({
    resolver: yupResolver(simulationFormSchema),
    mode: "onChange",
  });

  const onSubmit = handleSubmit((values) => {
    onSuccess(values);
  });

  return { ...form, onSubmit };
};
