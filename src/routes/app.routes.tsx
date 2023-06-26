import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Financing from "../screens/Financing";
import Simulation from "../screens/Simulation";

export type RootStackParamList = {
  Financing: undefined;
  Simulation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Financing" component={Financing} />
      </Stack.Group>
      <Stack.Screen name="Simulation" component={Simulation} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
