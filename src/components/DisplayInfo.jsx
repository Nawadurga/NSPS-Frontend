import {  View } from "react-native";
import React from "react";
import { Text, useTheme } from "react-native-paper";

const DisplayInfo = ({ info }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: theme.colors.elevation.level3,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        height: 100,
      }}
    >
      <Text variant="bodyLarge" style={{ textAlign: "center" }}>
        {info}
      </Text>
    </View>
  );
};

export default DisplayInfo;
