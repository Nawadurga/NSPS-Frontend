import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import {
  useCreateVehicleMutation,
  useUpdateVehicleDetailsMutation,
} from "../../redux/vehicleAPISlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import ProtectedComponent from "../../components/ProtectedComponent";
import CustomDropdown from "../../components/CustomDropdown";
import parkingSlotOptions from "../../utils/parkingSlotOptions";

const AddVehicleScreen = ({ route }) => {
  const { isAdmin } = useSelector(selectUser);
  const { userId } = route.params;

  const [editedVehicle, setEditedVehicle] = useState({
    numberPlate: "",
    model: null,
    parkingSlot: {
      slotStatus: false,
      slotNumber: null,
    },
  });

  const handleOptionSelect = (option) => {
    setEditedVehicle({
      ...editedVehicle,
      parkingSlot: { ...editedVehicle.parkingSlot, slotNumber: option },
    });
  };

  const [createVehicleMutation, { isError, error, isLoading, isSuccess }] =
    useCreateVehicleMutation();

  useEffect(() => {
    if (isSuccess) {
      setEditedVehicle({
        numberPlate: "",
        model: "",
        parkingSlot: {
          slotStatus: false,
          slotNumber: "",
        },
      });
    }
  }, [isSuccess]);

  const handleSaveChanges = (event) => {
    event.preventDefault();
    let body;
    if (isAdmin) {
      body = editedVehicle;
    } else {
      body = { ...editedVehicle, parkingSlot: null };
    }
    createVehicleMutation({ userId, body });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add vehicle</Text>

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
        label="Number Plate"
        mode="outlined"
        value={editedVehicle.numberPlate}
        onChangeText={(text) =>
          setEditedVehicle({ ...editedVehicle, numberPlate: text })
        }
        style={styles.input}
      />
      <TextInput
        label="Model"
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
        {isLoading ? "Adding..." : "Add Vehicle"}
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

export default AddVehicleScreen;
