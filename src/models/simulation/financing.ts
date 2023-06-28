export interface Installment {
  amortization: number;
  fee: number;
  installment: number;
  debit: number;
  valuation?: number;
}

export interface Simulation {
  financing: number;
  downPayment?: number;
  fee: number;
  installmentsNumber: number;
  installments: Installment[];
}
