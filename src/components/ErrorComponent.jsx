import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Text } from "react-native-paper";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const ErrorComponent = ({ title, errorMessage, noInternet }) => {
  return (
    <View style={styles.container}>
      {noInternet ? (
        <Text style={styles.title}>{"Oops! No Internet Connection."}</Text>
      ) : (
        <Text style={styles.title}>
          {title || "Oops! Something went wrong."}
        </Text>
      )}

      <Text style={styles.subtitle}>
        {errorMessage || "Please try again later."}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT-150,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign:"center"
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    
  },
});

export default ErrorComponent;
