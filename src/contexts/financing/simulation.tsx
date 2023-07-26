import { ReactNode, createContext, useContext, useState } from "react";
import { Simulation } from "../../models/simulation/financing";

interface FinancingSimulationState {
  simulation: Simulation;
}

interface FinancingSimulationContextProps {
  data: FinancingSimulationState;
  addSimulation: (simulation: Simulation) => void;
}

const FinancingSimulationContext = createContext(
  {} as FinancingSimulationContextProps
);

const FinancingSimulationProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState({} as FinancingSimulationState);

  const addSimulation = (simulation: Simulation) => {
    setData({ simulation });
  };

  return (
    <FinancingSimulationContext.Provider value={{ data, addSimulation }}>
      {children}
    </FinancingSimulationContext.Provider>
  );
};

function useFinancingSimulation(): FinancingSimulationContextProps {
  const context = useContext(FinancingSimulationContext);

  if (!context.data) {
    throw new Error(
      "useFinancingSimulation must be within an FinancingSimulationProvider"
    );
  }

  return context;
}

export { useFinancingSimulation, FinancingSimulationProvider };
