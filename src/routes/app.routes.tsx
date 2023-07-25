import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  FinancingRouter,
  FinancingStackParamList,
} from "../screens/Financing/router";
import Main from "../screens/Main";
import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Main: undefined;
  Financing: NavigatorScreenParams<FinancingStackParamList>;
  Simulation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerStyle: { backgroundColor: "#fbfbfb" },
          title: "",
          headerBackTitle: "",
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Financing" component={FinancingRouter} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppRoutes;
