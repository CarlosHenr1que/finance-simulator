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
  if (!valuationPercentage || !propertyValue) return 0;

  return (propertyValue += propertyValue * (valuationPercentage / 100));
};

interface InstallmentObject {
  amortization: number;
  fee: number;
  totalFee: number;
  installment: number;
  installmentAmount: number;
  debit: number;
  valuation?: number;
}

export const calculateFinance = async (
  financeValue: number,
  downPayment: number,
  installments: number,
  fee: number,
  valuationPercentage?: number,
  constantAmortization: number = 0
): Promise<InstallmentObject[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const installmentsObjects: InstallmentObject[] = [];
      const amortization = calculateAmortization(
        Number(financeValue - downPayment),
        Number(installments)
      );
      const initialDebit = calculateDebit(
        Number(financeValue - downPayment),
        amortization + constantAmortization
      );
      const initialValuation = calculatePropertyValuation(
        transformAnnuallyFeeToMonthly(valuationPercentage as number),
        financeValue + downPayment
      );
      var totalFee = 0;
      var installmentAmount = 0;

      for (let index = 0; index < Number(installments); index++) {
        const isFirst = index == 0;

        const previousInstallment = installmentsObjects[index - 1];

        if (!isFirst && previousInstallment.debit <= 0) {
          break;
        }

        const currentMonthDebit = isFirst
          ? initialDebit
          : previousInstallment.debit - (amortization + constantAmortization);

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

        totalFee += feeValue;
        installmentAmount += installment + constantAmortization;
        installmentsObjects.push({
          amortization,
          fee: feeValue,
          totalFee,
          installment,
          installmentAmount,
          debit: currentMonthDebit,
          valuation,
        });
      }

      resolve(installmentsObjects);
    });
  });
};
