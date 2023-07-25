import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateSimulation from "../screens/CreateSimulation";
import Simulation from "../screens/Simulation";

export type FinancingStackParamList = {
  CreateSimulation: undefined;
  Simulation: undefined;
};

const Stack = createNativeStackNavigator<FinancingStackParamList>();

export const FinancingRouter: React.FC = () => (
  <Stack.Navigator
    initialRouteName="CreateSimulation"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="CreateSimulation" component={CreateSimulation} />
    <Stack.Screen name="Simulation" component={Simulation} />
  </Stack.Navigator>
);
