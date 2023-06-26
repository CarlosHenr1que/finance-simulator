import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

export interface SimulateForm {
  financeValue: string;
  installments: string;
  fee: string;
}

const validations = {
  nonZero: {
    name: "non-zero",
    message: "Deve ser maior que zero",
    test: (value: string | undefined) => Number(value?.replace(",", ".")) > 0,
  },
};

const { nonZero } = validations;
const simulationFormSchema: yup.ObjectSchema<SimulateForm> = yup.object({
  financeValue: yup
    .string()
    .test(nonZero.name, nonZero.message, nonZero.test)
    .required("Este campo deve ser preenchido"),
  installments: yup
    .string()
    .test(nonZero.name, nonZero.message, nonZero.test)
    .required("Este campo deve ser preenchido"),
  fee: yup
    .string()
    .test(nonZero.name, nonZero.message, nonZero.test)
    .required("Este campo deve ser preenchido"),
});

export const useSimulateFinancingForm = (
  onSuccess: (values: SimulateForm) => void
) => {
  const { handleSubmit, ...form } = useForm({
    resolver: yupResolver(simulationFormSchema),
    defaultValues: {},
  });

  const onSubmit = handleSubmit((values) => {
    onSuccess(values);
  });

  return { ...form, onSubmit };
};
