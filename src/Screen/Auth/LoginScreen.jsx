import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { TextInput, Button, Text, IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import Routes from "../../navigation/Routes";
import { useLoginMutation } from "../../redux/authAPISlice";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [
    loginMutation,
    { data: user, isError, error: authError, isSuccess, isLoading },
  ] = useLoginMutation();


  const handleLogin = async (event) => {
    event.preventDefault();
    if (!phoneNo.trim()) {
      setError("Phone number is required.");
      return;
    }
    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    const body = { phoneNo, password };
    loginMutation(body);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(login(user));

      setPhoneNo("");
      setPassword("");
      setError("");
    }
  }, [isSuccess, user]);

  useEffect(() => {
    if (isError) {
      if (authError && authError.data && authError.data.message) {
        setError(authError.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isError, error]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    // navigation.navigate(Routes.FORGET_PASSWORD_SCREEN);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Nawadurga Parking</Text>
      {error && (
        <Text
          style={{
            marginBottom: 16,
            backgroundColor: "red",
            width: "100%",
            padding: 16,
            color: "white",
          }}
        >
          {error}
        </Text>
      )}

      <TextInput
        label="Phone number"
        value={phoneNo}
        onChangeText={setPhoneNo}
        keyboardType="number-pad"
        mode="outlined"
        maxLength={10}
        style={{ marginBottom: 12, width: "100%" }}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
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

      <Text style={styles.forgotPasswordText} onPress={handleForgotPassword}>
        Forgot Password?
      </Text>

      <Button
        mode="contained"
        onPress={handleLogin}
        style={{ width: "100%" }}
        disabled={isLoading}
      >
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {isLoading ? "Processing..." : "Login"}
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
    marginHorizontal:16,
    textAlign: "center",
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

export default LoginScreen;
