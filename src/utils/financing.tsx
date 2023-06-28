const transformAnnuallyFeeToMonthly = (fee: number) =>
  ((1 + fee / 100) ** (1 / 12) - 1) * 100;

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

const calculatePropertyValuation = (
  valuationPercentage?: number,
  propertyValue?: number
) => {
  if (!valuationPercentage || !propertyValue) return;

  return (propertyValue += propertyValue * (valuationPercentage / 100));
};

interface InstallmentObject {
  amortization: number;
  fee: number;
  installment: number;
  debit: number;
  valuation?: number;
}

export const calculateFinance = async (
  financeValue: number,
  downPayment: number,
  installments: number,
  fee: number,
  valuationPercentage?: number
): Promise<InstallmentObject[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const installmentsObjects: InstallmentObject[] = [];
      const amortization = calculateAmortization(
        Number(financeValue),
        Number(installments)
      );
      const initialDebit = calculateDebit(Number(financeValue), amortization);
      const initialValuation = calculatePropertyValuation(
        transformAnnuallyFeeToMonthly(valuationPercentage as number),
        financeValue + downPayment
      );

      for (let index = 0; index < Number(installments); index++) {
        const isFirst = index == 0;

        const previousInstallment = installmentsObjects[index - 1];
        const currentMonthDebit = isFirst
          ? initialDebit
          : previousInstallment.debit - amortization;

        const feeValue = calculateFeeValue(
          Number(transformAnnuallyFeeToMonthly(fee)) / 100,
          currentMonthDebit
        );

        const installment = calculateInstallment(amortization, feeValue);
        const valuation = isFirst
          ? initialValuation
          : calculatePropertyValuation(
              transformAnnuallyFeeToMonthly(valuationPercentage as number),
              previousInstallment.valuation
            );

        installmentsObjects.push({
          amortization,
          fee: feeValue,
          installment,
          debit: currentMonthDebit,
          valuation,
        });
      }

      resolve(installmentsObjects);
    });
  });
};
