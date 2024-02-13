// VehicleInfo.js
import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import Routes from "../../navigation/Routes";
import { Button, Divider, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useDeleteVehicleMutation } from "../../redux/vehicleAPISlice";
import DeleteItemDialog from "../../components/DeleteItemDialog";

const VehicleInfo = ({ vehicle, index }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const myStyles = styles(theme);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [deleteVehicleMutation] = useDeleteVehicleMutation();

  const onPressEdit = () => {
    navigation.navigate(Routes.EDIT_VEHICLE_INFO_SCREEN, { vehicle });
  };
  const onPressDelete = () => {
    setShowDeleteDialog(true);
  };

  const onDelete = () => {
    deleteVehicleMutation(vehicle.id);
  };
  const onCancel = () => {
    setShowDeleteDialog(false);
  };

  const onPressShowEntryExitStatus = () => {
    navigation.navigate(Routes.VEHICLE_STAMP_SCREEN);
  };

  const iconStyle = (index) => {
    const leftPositionStyleOfIcon = {
      left: 8,
    };
    const rightPositionStyleOfIcon = {
      right: 8,
    };
    return index % 2 === 0 ? rightPositionStyleOfIcon : leftPositionStyleOfIcon;
  };

  return (
    <View style={myStyles.container}>
      <View
        style={[
          myStyles.row,
          { flexDirection: index % 2 === 0 ? "row" : "row-reverse" },
        ]}
      >
        <View style={myStyles.carInfo}>
          <Text style={myStyles.carLabel}>Car Model</Text>
          <Text style={myStyles.carValue}>{vehicle.model || "NaN"}</Text>

          <Text style={myStyles.carLabel}>Car Number Plate</Text>
          <Text style={myStyles.carValue}>{vehicle.numberPlate}</Text>

          <Text style={myStyles.carLabel}>Parking Slot</Text>
          <Text style={myStyles.carValue}>
            {vehicle?.parkingSlot?.slotNumber || "Not Allocated"}
          </Text>
          <Text style={myStyles.carLabel}>
            Parked:{" "}
            <Text style={myStyles.carValue}>
              {vehicle?.parkingSlot?.slotStatus ? "Yes" : "No"}
            </Text>
          </Text>
        </View>
        <View style={myStyles.carImage}>
          <Image
            source={require("../../assets/car.png")}
            style={myStyles.carImage}
          />
        </View>
      </View>

      <View style={[myStyles.iconContainer, iconStyle(index)]}>
        <View
          style={{ flexDirection: index % 2 === 0 ? "row-reverse" : "row" }}
        >
          <Pressable
            style={myStyles.editIconContainer}
            onPress={onPressDelete}
            underlayColor="#000" // Change the background color when pressed
            activeOpacity={0.7} // Adjust the opacity when pressed
          >
            <MaterialIcons name="delete" size={24} color={"#FF4040"} />
          </Pressable>

          <Pressable
            style={myStyles.editIconContainer}
            onPress={onPressEdit}
            activeOpacity={0.7} // Adjust the opacity when pressed
          >
            <MaterialIcons name="edit" size={24} color={theme.colors.primary} />
          </Pressable>
        </View>
      </View>

      <DeleteItemDialog
        showDeleteDialog={showDeleteDialog}
        itemName={"vehicle"}
        onDelete={onDelete}
        onCancel={onCancel}
      />
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.dark ? theme.colors.elevation.level3 : "#f5f5f5",
      borderRadius: 20,
      marginBottom: 8,
      paddingVertical: 12,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    carInfo: {
      flex: 1,
      marginLeft: 16, // Added margin to separate columns
    },
    carImage: {
      width: Dimensions.get("window").width / 2 - 24,
      height: 200,
      resizeMode: "contain",
    },
    carLabel: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 4,
    },
    carValue: {
      fontSize: 16,
      marginBottom: 8,
    },
    iconContainer: {
      position: "absolute",
      top: 8,
      right: 8,
    },

    editIconContainer: {
      padding: 6,
      borderRadius: 25,
      // borderWidth: 0.5,
      // backgroundColor: theme.colors.primary,
    },
  });

export default VehicleInfo;
