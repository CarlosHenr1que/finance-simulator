import React, { ReactNode } from "react";

import { FinancingSimulationProvider } from "./financing/simulation";
import { InvestingSimulationProvider } from "@screens/Investing/contexts/simulation";

interface Props {
  children: ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <FinancingSimulationProvider>
    <InvestingSimulationProvider>{children}</InvestingSimulationProvider>
  </FinancingSimulationProvider>
);

export default AppProvider;
