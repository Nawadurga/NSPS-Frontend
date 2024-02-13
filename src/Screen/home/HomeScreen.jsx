import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import useSendExpoToken from "../../hooks/useSendExpoToken";
import { useNavigation } from "@react-navigation/native";
import Routes from "../../navigation/Routes";
import ParkingMap from "./ParkingMap";

const HomeScreen = () => {
  const navigation = useNavigation();
  useSendExpoToken();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View // change this view with bg image
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ccc",
        }}
      >
        <ParkingMap />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
