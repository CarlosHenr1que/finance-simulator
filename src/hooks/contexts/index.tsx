import React, { ReactNode } from "react";

import { FinancingSimulationProvider } from "./financing/simulation";

interface Props {
  children: any;
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <FinancingSimulationProvider>{children}</FinancingSimulationProvider>
);

export default AppProvider;
