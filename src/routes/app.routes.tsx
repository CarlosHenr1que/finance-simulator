import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";

import {
  FinancingRouter,
  FinancingStackParamList,
} from "../screens/Financing/router";
import {
  InvestingRouter,
  InvestingStackParamList,
} from "@screens/Investing/router";

import Main from "../screens/Main";

export type RootStackParamList = {
  Main: undefined;
  Financing: NavigatorScreenParams<FinancingStackParamList>;
  Investing: NavigatorScreenParams<InvestingStackParamList>;
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
        <Stack.Screen name="Investing" component={InvestingRouter} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppRoutes;
