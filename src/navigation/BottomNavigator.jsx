import React, { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native-paper";

import { useTheme } from "react-native-paper";

import Routes from "./Routes";
import HomeScreen from "../Screen/home/HomeScreen";
import CustomNavigationBar from "../components/CustomNavigationBar";
import PayScreen from "../Screen/payment/PayScreen";

import ProfileScreen from "../Screen/Profile/ProfileScreen";
import NotificationScreen from "../Screen/notification/NotificationScreen";

const Tab = createBottomTabNavigator();

const BottomNavigator = ({ navigation }) => {
  const theme = useTheme();
  const myStyles = styles(theme);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });

    return () => {
      navigation.setOptions({ headerShown: true });
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        keyboardHidesTabBar: true,
        tabBarStyle: { ...myStyles.tabBar },
        tabBarLabel: () => (
          <Text
            variant="labelMedium"
            style={{
              color: theme.colors.onSurfaceVariant,
            }}
          >
            {route.name}
          </Text>
        ),

        header: (props) => (
          <CustomNavigationBar title={props.options.title} {...props} />
        ),

        unmountOnBlur: true,
      })}
    >
      <Tab.Screen
        name={Routes.HOME_SCREEN}
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View style={focused && myStyles.icon}>
              <MaterialCommunityIcons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={theme.colors.onSurfaceVariant}
                style={{ margin: "auto" }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={Routes.PAY_SCREEN}
        component={PayScreen}
        options={{
          title: "Pay",
          tabBarIcon: ({ focused }) => (
            <View style={focused && myStyles.icon}>
              <Ionicons
                name={focused ? "newspaper" : "newspaper-outline"}
                size={22}
                color={theme.colors.onSurfaceVariant}
                style={{ margin: "auto" }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={Routes.NOTIFICATION_SCREEN}
        component={NotificationScreen}
        options={() => ({
          title: "Notification",
          tabBarIcon: ({ focused }) => (
            <View style={focused && myStyles.icon}>
              <MaterialIcons
                name={focused ? "notifications" : "notifications-none"}
                size={22}
                color={theme.colors.onSurfaceVariant}
              />
            </View>
          ),
        })}
      />

      <Tab.Screen
        name={Routes.PROFILE_SCREEN}
        component={ProfileScreen}
        options={() => ({
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <View style={focused && myStyles.icon}>
              <MaterialCommunityIcons
                name={focused ? "account" : "account-outline"}
                size={24}
                color={theme.colors.onSurfaceVariant}
              />
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    tabBar: {
      bottom: 0,
      backgroundColor: theme.colors.elevation.level1,
      height: 65,
      paddingBottom: 10,
      paddingTop: 5,
    },
    icon: {
      backgroundColor: theme.colors.primaryContainer,
      width: 62,
      borderRadius: 38,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      maxHeight: 30,
    },
  });

export default BottomNavigator;
