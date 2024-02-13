import React from "react";
import { useTheme, adaptNavigationTheme } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

import Routes from "./Routes";
import LoginScreen from "../Screen/Auth/LoginScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const theme = useTheme();

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme = {
    ...theme,
    ...LightTheme,
    colors: {
      ...theme.colors,
      ...LightTheme.colors,
    },
  };

  const CombinedDarkTheme = {
    ...DarkTheme,
    ...theme,
    colors: {
      ...DarkTheme.colors,
      ...theme.colors,
    },
  };
  return (
    <NavigationContainer
      theme={theme.dark ? CombinedDarkTheme : CombinedDefaultTheme}
    >
      <Stack.Navigator>
        <Stack.Screen
          name={Routes.LOGINSCREEN}
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
