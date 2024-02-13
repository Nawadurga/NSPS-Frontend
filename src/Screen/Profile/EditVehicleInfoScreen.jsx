// EditProfileScreen.js
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useUpdateVehicleDetailsMutation } from "../../redux/vehicleAPISlice";
import { selectUser } from "../../redux/userSlice";
import { useSelector } from "react-redux";

import parkingSlotOptions from "../../utils/parkingSlotOptions";
import CustomDropdown from "../../components/CustomDropdown";
import ProtectedComponent from "../../components/ProtectedComponent";

const EditVehicleInfoScreen = ({ route }) => {
  const { vehicle } = route.params;

  const handleOptionSelect = (option) => {
    setEditedVehicle({
      ...editedVehicle,
      parkingSlot: {
        ...editedVehicle.parkingSlot,
        slotNumber: option,
      },
    });
  };

  const [editedVehicle, setEditedVehicle] = useState({
    id: vehicle.id,
    numberPlate: vehicle.numberPlate,
    model: vehicle.model,
    parkingSlot: {
      id: vehicle.parkingSlot?.id ? vehicle.parkingSlot.id : null,
      slotStatus: vehicle.parkingSlot?.slotStatus
        ? vehicle.parkingSlot.slotStatus
        : null,
      slotNumber: vehicle.parkingSlot?.slotNumber
        ? vehicle.parkingSlot.slotNumber
        : null,
    },
  });

  const [updateVehicleMutation, { isError, error, isLoading, isSuccess }] =
    useUpdateVehicleDetailsMutation();

  const handleSaveChanges = (event) => {
    event.preventDefault();

    updateVehicleMutation({
      vehicleId: vehicle.id,
      updatedVehicle: editedVehicle,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit vehicle</Text>

      {isError && (
        <Text
          style={{
            marginBottom: 16,
            backgroundColor: "red",
            width: "100%",
            padding: 16,
            color: "white",
          }}
        >
          {error.data.message}
        </Text>
      )}

      {isSuccess && (
        <Text
          style={{
            marginBottom: 16,
            backgroundColor: "#32CD32",
            width: "100%",
            padding: 16,
            color: "white",
          }}
        >
          Succeeded
        </Text>
      )}

      <TextInput
        label="numberPlate"
        mode="outlined"
        value={editedVehicle.numberPlate}
        onChangeText={(text) =>
          setEditedVehicle({ ...editedVehicle, numberPlate: text })
        }
        style={styles.input}
      />
      <TextInput
        label="model"
        mode="outlined"
        value={editedVehicle.model}
        onChangeText={(text) =>
          setEditedVehicle({ ...editedVehicle, model: text })
        }
        style={styles.input}
      />

      <ProtectedComponent>
        <Text style={{ marginBottom: 8 }}>Parking Slot:</Text>
        <CustomDropdown
          label="Select Option"
          options={parkingSlotOptions}
          onSelect={handleOptionSelect}
        />
      </ProtectedComponent>

      <Button
        mode="contained"
        onPress={handleSaveChanges}
        style={styles.saveButton}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
  },
  saveButton: {
    marginTop: 16,
  },
});

export default EditVehicleInfoScreen;
