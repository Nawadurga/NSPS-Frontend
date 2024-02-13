// EditProfileScreen.js
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Text, IconButton } from "react-native-paper";
import { useCreateUserMutation } from "../../redux/userAPISlice";
import { useEffect } from "react";
import Routes from "../../navigation/Routes";

const AddUserScreen = ({ navigation }) => {

  const [showPassword, setShowPassword] = useState(false);

  const [editedUser, setEditedUser] = useState({
    name: null,
    address: null,
    phoneNo: null,
    password: null,
    role: "USER",
  });

  const [
    createUserMutation,
    { data: userData, isError, error, isLoading, isSuccess },
  ] = useCreateUserMutation();

  useEffect(() => {
    if (isSuccess) {
      setEditedUser({
        name: null,
        address: null,
        phoneNo: null,
        password: null,
        role: "USER",
      });

      navigation.navigate(Routes.USER_PROFILE_SCREEN, { userId: userData.id });
    }
  }, [isSuccess]);

  const handleSaveChanges = (event) => {
    event.preventDefault();

    const body = { ...editedUser };
    createUserMutation(body);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add User</Text>

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
        label="Phone no."
        mode="outlined"
        maxLength={10}
        keyboardType="numeric"
        value={editedUser.phoneNo}
        onChangeText={(text) => setEditedUser({ ...editedUser, phoneNo: text })}
        style={styles.input}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          label="Password"
          value={editedUser.password}
          onChangeText={(text) =>
            setEditedUser({ ...editedUser, password: text })
          }
          secureTextEntry={!showPassword}
          mode="outlined"
          style={styles.passwordInput}
        />

        <IconButton
          icon={showPassword ? "eye" : "eye-off"}
          onPress={toggleShowPassword}
          style={styles.eyeIcon}
          size={20}
        />
      </View>

      <TextInput
        label="Address"
        mode="outlined"
        value={editedUser.address}
        onChangeText={(text) => setEditedUser({ ...editedUser, address: text })}
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

  forgotPasswordText: {
    marginTop: 0,
    marginBottom: 12,
    color: "rgb(45,136,255)",
    marginLeft: "auto",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    width: "100%",
  },
  passwordInput: {
    flex: 1,
    paddingRight: 28,
  },
  eyeIcon: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: -20 }],
  },
});

export default AddUserScreen;
