import { formatCurrency } from "../../utils/currency";

const formatMonthToDuration = (value: number) => {
  const [years, months] = String(value / 12).split(".");

  if (months) {
    return `${years} Anos ${months[0]} meses`;
  }
  return `${years} Anos`;
};

export const getInstallmentItems = (installments: any[]) => {
  return [
    {
      title: "Duração",
      description: formatMonthToDuration(installments.length),
    },
    {
      title: "Pagas",
      description: String(installments.length),
    },
    {
      title: "Ultima",
      description: formatCurrency(installments.at(-1)?.installment) as string,
    },
  ];
};
