import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

export interface CreateInvestmentForm {
  initialValue: string;
  fee: string;
  regularContribution?: string;
  duration: string;
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
const investmentCreationForm: yup.ObjectSchema<CreateInvestmentForm> =
  yup.object({
    initialValue: yup.string().required("Este campo deve ser preenchido"),
    fee: yup
      .string()
      .test(nonZero.name, nonZero.message, nonZero.test)
      .required("Este campo deve ser preenchido"),
    regularContribution: yup
      .string()
      .test(nonZero.name, nonZero.message, nonZero.test),
    duration: yup
      .string()
      .test(nonZero.name, nonZero.message, nonZero.test)
      .required("Este campo deve ser preenchido"),
  });

export const useInvestmentCreationForm = (
  onSuccess: (values: CreateInvestmentForm) => void
) => {
  const { handleSubmit, ...form } = useForm({
    resolver: yupResolver(investmentCreationForm),
    mode: "onChange",
  });

  const onSubmit = handleSubmit((values) => {
    onSuccess(values);
  });

  return { ...form, onSubmit };
};
