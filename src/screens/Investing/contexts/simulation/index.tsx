import { ReactNode, createContext, useContext, useState } from "react";

export interface Earning {
  currentBalance: number;
  profit: number;
  profitAmount: number;
}

interface Simulation {
  balance: number;
  initialValue: number;
  fee: number;
  regularContribution: number;
  duration: number;
  earnings: Earning[];
}

interface FinancingSimulationState {
  simulation: Simulation;
}

interface InvestingSimulationContextProps {
  data: FinancingSimulationState;
  addSimulation: (simulation: Simulation) => void;
}

const InvestingSimulationContext = createContext(
  {} as InvestingSimulationContextProps
);

const InvestingSimulationProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState({} as FinancingSimulationState);

  const addSimulation = (simulation: Simulation) => {
    setData({ simulation });
  };

  return (
    <InvestingSimulationContext.Provider value={{ data, addSimulation }}>
      {children}
    </InvestingSimulationContext.Provider>
  );
};

function useInvestingSimulation(): InvestingSimulationContextProps {
  const context = useContext(InvestingSimulationContext);

  if (!context.data) {
    throw new Error(
      "useInvestingSimulation must be within an InvestingSimulationProvider"
    );
  }

  return context;
}

export { useInvestingSimulation, InvestingSimulationProvider };
