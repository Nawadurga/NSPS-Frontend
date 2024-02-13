import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text, useTheme, Card } from "react-native-paper";
import { useGetVehicleByUserIdQuery } from "../../redux/vehicleAPISlice";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Routes from "../../navigation/Routes";
import VehicleStamp from "./VehicleStamp";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import Loading from "../../components/Loading";
import ErrorComponent from "../../components/ErrorComponent";
import DisplayInfo from "../../components/DisplayInfo";
import ProtectedComponent from "../../components/ProtectedComponent";

const PayScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const myStyles = styles(theme);
  const [vehicleId, setVehicleId] = useState(null);
  const [userIdToQuery, setUserIdToQuery] = useState(userId);

  // For Admin to watch all users data
  const userFromRoute = route?.params?.user;

  // default user Id
  const { userId, name } = useSelector(selectUser);

  useEffect(() => {
    if (userFromRoute) {
      setUserIdToQuery(userFromRoute.id);
    } else {
      setUserIdToQuery(userId);
    }
  }, [userFromRoute, userId]);

  useEffect(() => {
    return () => {
      navigation.setParams({ user: null });
    };
  }, []);

  const {
    data: vehicles,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetVehicleByUserIdQuery(userIdToQuery);

  useEffect(() => {
    if (isSuccess && vehicles.length > 0) {
      handleVehiclePress(vehicles[0].id);
    }
  }, [isSuccess]);

  const handleVehiclePress = (id) => {
    setVehicleId(id);
  };

  if (isLoading || !userIdToQuery) {
    return <Loading height={600} style={{ marginVertical: 10 }} />;
  }

  if (isError) {
    let errMsg = error?.data?.message || "Please try again later.";
    return <ErrorComponent errorMessage={errMsg} />;
  }

  return (
    <ScrollView style={myStyles.container}>
      {vehicles.length > 1 && (
        <>
          <ProtectedComponent>
            <Text
              variant="titleMedium"
              style={{ textAlign: "center", marginBottom: 16 }}
            >
              User: {userFromRoute?.name ? userFromRoute.name : name}
            </Text>
          </ProtectedComponent>

          <View style={myStyles.rowContainer}>
            {vehicles.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.id}
                onPress={() => handleVehiclePress(vehicle.id)}
                style={[
                  myStyles.vehicleCard,
                  vehicle.id === vehicleId && myStyles.activeVehicle,
                ]}
              >
                <Card.Content style={myStyles.cardContent}>
                  <Icon
                    name="car-side"
                    size={32} // Adjust the size as needed
                    color={theme.dark ? "#fff" : "#000"}
                    style={myStyles.carIcon}
                  />

                  <Text style={myStyles.vehicleText}>
                    {vehicle.model || "NaN"}
                  </Text>

                  <Text>{vehicle.numberPlate || "NaN"}</Text>
                </Card.Content>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
      {vehicles.length === 0 ? (
        <DisplayInfo info={"No vehicle register yet"} />
      ) : (
        <VehicleStamp vehicleId={vehicleId} />
      )}
      <Button
        mode="contained"
        style={myStyles.payButton}
        onPress={() => navigation.navigate(Routes.PAYMENT_REPORT)}
      >
        Pay Bill
      </Button>
    </ScrollView>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },
    rowContainer: {
      flexDirection: "row",
      flexWrap: "wrap", // Allow multiple rows
      justifyContent: "space-around", // Distribute items evenly along the row
    },
    vehicleCard: {
      marginBottom: 16,
      width: "45%", // Adjust the width as needed
      minWidth: 150, // Minimum width for better layout consistency
      borderWidth: 1,
      borderColor: theme.colors.elevation.level5, // Default border color
      borderRadius: 8,
      overflow: "hidden",
    },
    activeVehicle: {
      borderColor: theme.colors.primary,
    },
    cardContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 8,
    },
    carIcon: {
      alignSelf: "center",
      marginTop: 8,
    },
    vehicleText: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 8,
    },
    payButton: {
      marginTop: 48,
      backgroundColor: theme.colors.primary,
    },
  });

export default PayScreen;
