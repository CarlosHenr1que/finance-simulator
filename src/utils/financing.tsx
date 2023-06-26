const calculateAmortization = (
  financeValue: number,
  installmentsNumber: number
) => {
  return financeValue / installmentsNumber;
};

const calculateFeeValue = (monthlyFee: number, currentDebit: number) => {
  return monthlyFee * currentDebit;
};

const calculateInstallment = (amortization: number, fee: number) => {
  return amortization + fee;
};

const calculateDebit = (financeValue: number, amortization: number) => {
  return financeValue - amortization;
};

interface InstallmentObject {
  amortization: number;
  fee: number;
  installment: number;
  debit: number;
}

export const calculateFinance = async (
  financeValue: number,
  installments: number,
  fee: number
): Promise<InstallmentObject[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const installmentsObjects: InstallmentObject[] = [];
      const amortization = calculateAmortization(
        Number(financeValue),
        Number(installments)
      );
      const initialDebit = calculateDebit(Number(financeValue), amortization);

      for (let index = 0; index < Number(installments); index++) {
        const isFirst = index == 0;

        const previousInstallment = installmentsObjects[index - 1];
        const currentMonthDebit = isFirst
          ? initialDebit
          : previousInstallment.debit - amortization;

        const feeValue = calculateFeeValue(
          Number(fee) / 100,
          currentMonthDebit
        );
        const installment = calculateInstallment(amortization, feeValue);

        installmentsObjects.push({
          amortization,
          fee: feeValue,
          installment,
          debit: currentMonthDebit,
        });
      }

      resolve(installmentsObjects);
    });
  });
};
