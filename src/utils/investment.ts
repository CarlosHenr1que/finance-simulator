import { transformAnnuallyFeeToMonthly } from "./financing";

interface Installment {
  currentBalance: number;
  profit: number;
  profitAmount: number;
}

interface InvestmentResult {
  balance: number;
  profit: number;
  installments: Installment[];
}

export const calculateInvestment = (
  initialValue: number,
  fee: number,
  monthlyContribution: number,
  duration: number
): Promise<InvestmentResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const installments: Installment[] = [];
      const monthlyFee = transformAnnuallyFeeToMonthly(fee);

      for (let index = 0; index < duration; index++) {
        if (index === 0) {
          const initialProfit =
            (initialValue + monthlyContribution * monthlyFee) / 100;
          installments.push({
            currentBalance: initialValue + monthlyContribution,
            profit: initialProfit,
            profitAmount: initialProfit,
          });
          continue;
        }
        const previousBalance = installments[index - 1].currentBalance;
        const previousProfit = installments[index - 1].profit;
        const currentProfit = calculateProfit(
          previousBalance + monthlyContribution,
          monthlyFee
        );

        const currentBalance =
          previousBalance + monthlyContribution + previousProfit;
        const currentProfitSum =
          installments[index - 1].profitAmount + currentProfit;

        installments.push({
          currentBalance: currentBalance,
          profit: currentProfit,
          profitAmount: currentProfitSum,
        });
      }

      const lastInstallment = installments.at(-1) as Installment;

      resolve({
        balance: lastInstallment.currentBalance + lastInstallment.profit,
        profit: lastInstallment.profitAmount,
        installments,
      });
    });
  });
};

function calculateProfit(currentBalance: any, monthlyFee: number) {
  return (currentBalance * monthlyFee) / 100;
}
