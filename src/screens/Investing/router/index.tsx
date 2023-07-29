import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateSimulation from "../screens/CreationSimulation";
import Simulation from "../screens/Simulation";

export type InvestingStackParamList = {
  CreateSimulation: undefined;
  Simulation: undefined;
};

const Stack = createNativeStackNavigator<InvestingStackParamList>();

export const InvestingRouter: React.FC = () => (
  <Stack.Navigator
    initialRouteName="CreateSimulation"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="CreateSimulation" component={CreateSimulation} />
    <Stack.Screen name="Simulation" component={Simulation} />
  </Stack.Navigator>
);
