export interface Installment {
  amortization: number;
  fee: number;
  totalFee: number;
  installment: number;
  installmentAmount: number;
  debit: number;
  valuation?: number;
}

export interface Simulation {
  financing: number;
  downPayment?: number;
  fee: number;
  installmentsNumber: number;
  installments: Installment[];
  valuationPercentage?: number;
  constantAmortization?: number;
}
