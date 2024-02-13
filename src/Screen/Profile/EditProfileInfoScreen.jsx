// EditProfileScreen.js
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useUpdateUserDetailsMutation } from "../../redux/userAPISlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import ProtectedComponent from "../../components/ProtectedComponent";

const EditProfileInfoScreen = ({ route }) => {
  const { user } = route.params;
  const { isAdmin } = useSelector(selectUser);

  const [editedUser, setEditedUser] = useState({
    name: user.name,
    address: user.address,
    phoneNo: user.phoneNo,
    role: user.isAdmin ? "ADMIN" : "USER",
  });

  const [updateUserMutation, { isError, error, isLoading, isSuccess }] =
    useUpdateUserDetailsMutation();

  const handleSaveChanges = (event) => {
    event.preventDefault();

    const body = { ...editedUser };
    updateUserMutation({ userId: user.id, updatedUser: body });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

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
        label="Name"
        mode="outlined"
        value={editedUser.name}
        onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
        style={styles.input}
      />
      <TextInput
        label="Address"
        mode="outlined"
        value={editedUser.address}
        onChangeText={(text) => setEditedUser({ ...editedUser, address: text })}
        style={styles.input}
      />
      <TextInput
        label="Contact Number"
        mode="outlined"
        keyboardType="numeric"
        maxLength={10}
        value={editedUser.phoneNo}
        onChangeText={(text) => setEditedUser({ ...editedUser, phoneNo: text })}
        style={styles.input}
      />

     

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

export default EditProfileInfoScreen;
