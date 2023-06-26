export interface Installment {
  amortization: number;
  fee: number;
  installment: number;
  debit: number;
}

export interface Simulation {
  financing: number;
  fee: number;
  installmentsNumber: number;
  installments: Installment[];
}
