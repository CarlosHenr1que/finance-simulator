import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

export interface AmortizationForm {
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
const simulationFormSchema: yup.ObjectSchema<AmortizationForm> = yup.object({
  constantAmortization: yup
    .string()
    .required("Este campo deve ser preenchido")
    .test(nonZero.name, nonZero.message, nonZero.test),
});

export const useAmortizationForm = (
  onSuccess: (values: AmortizationForm) => void
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
