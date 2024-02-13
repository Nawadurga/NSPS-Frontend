import * as React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { useTheme, adaptNavigationTheme } from "react-native-paper";

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

import DrawerContent from "../components/DrawerContent";
import Routes from "./Routes";
import AppNavigator from "./AppNavigator";



const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
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
      <Drawer.Navigator
        initialRouteName={Routes.APP_NAVIGATION}
        drawerContent={() => <DrawerContent />}
      >
        <Drawer.Screen
          name={Routes.APP_NAVIGATION}
          component={AppNavigator}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;
