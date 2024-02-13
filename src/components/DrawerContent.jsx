import React from "react";
import { StyleSheet, View } from "react-native";

import { DrawerContentScrollView } from "@react-navigation/drawer";

import { Avatar, Drawer, Text, useTheme, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Routes from "../navigation/Routes";
import { StatusBar } from "expo-status-bar";

import { SafeAreaView } from "react-native-safe-area-context";
import { logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import ProtectedComponent from "./ProtectedComponent";

const DrawerContent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const DrawerItemsData = [
    {
      label: "Home",
      icon: "home",
      key: 1,
      navigationRoute: Routes.HOME_SCREEN,
      directNavigation: true,
    },
    {
      label: "Pay",
      icon: "credit-card",
      key: 2,
      navigationRoute: Routes.PAY_SCREEN,
      directNavigation: true,
    },
    {
      label: "Notification",
      icon: "bell-ring",
      key: 3,
      navigationRoute: Routes.NOTIFICATION_SCREEN,
      directNavigation: true,
    },

    {
      label: "Profile",
      icon: "account",
      key: 5,
      navigationRoute: Routes.PROFILE_SCREEN,
      directNavigation: true,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.headerSection, { marginTop: StatusBar.length }]}>
        <Avatar.Image size={92} source={require("../assets/icon.png")} />
        <View style={styles.headerTitle}>
          <Text variant="titleLarge">Car Parking </Text>
          <Text>Management System</Text>
        </View>
      </View>

      <Divider style={{ marginTop: 20 }} />

      <DrawerContentScrollView alwaysBounceVertical={false}>
        {DrawerItemsData.map((props, index) => (
          <Drawer.Item
            {...props}
            key={props.key}
            onPress={() => {
              if (props.directNavigation) {
                navigation.navigate(props.navigationRoute);
              } else {
                navigation.navigate(Routes.BOTTOM_NAVIGATION, {
                  screen: props.navigationRoute,
                });
              }
            }}
          />
        ))}

        <ProtectedComponent>
          <Drawer.Item
            key="4"
            label="Alerts"
            icon="alert"
            onPress={() => {
              navigation.navigate(Routes.ALERT_SCREEN);
            }}
          />
        </ProtectedComponent>

        <Divider />
        <Drawer.Item
          key="adfasdf"
          label="Logout"
          icon="logout"
          onPress={() => {
            dispatch(logout());
          }}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingLeft: 16,
  },
  headerTitle: {
    marginLeft: 10,
  },
});

export default DrawerContent;
