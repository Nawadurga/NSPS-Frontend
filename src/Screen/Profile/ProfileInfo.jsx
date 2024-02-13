import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { Avatar, IconButton, Text, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import Routes from "../../navigation/Routes";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";

const ProfileInfo = ({ user }) => {
  const { isAdmin } = useSelector(selectUser);
  const navigation = useNavigation();
  const theme = useTheme();
  const myStyles = styles(theme);

  const handleEditProfile = () => {
    navigation.navigate(Routes.EDIT_PROFILE_INFO_SCREEN, { user });
  };

  return (
    <View style={myStyles.row}>
      <View style={myStyles.profileImage}>
        <Avatar.Image
          style={{ backgroundColor: "transparent" }}
          size={100}
          source={require("../../assets/avatar.png")}
        />
      </View>
      <View style={myStyles.profileInfo}>
        <Text style={myStyles.profileLabel}>Name</Text>
        <Text style={myStyles.profileValue}>
          {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
        </Text>

        <Text style={myStyles.profileLabel}>Address</Text>
        <Text style={myStyles.profileValue}>{user.address || "N/A"}</Text>

        <Text style={myStyles.profileLabel}>Contact Number</Text>
        <Text style={myStyles.profileValue}>{user.phoneNo}</Text>

        {isAdmin && (
          <>
            <Text style={myStyles.profileLabel}>
              Role:{" "}
              <Text style={myStyles.profileValue}>
                {user.isAdmin ? "ADMIN" : "USER"}
              </Text>
            </Text>
          </>
        )}

        <Text style={myStyles.profileLabel}>
          Created date:{" "}
          <Text style={myStyles.profileValue}>{user.createdAt}</Text>
        </Text>
      </View>
      {/* Edit Icon */}
      <TouchableHighlight
        style={myStyles.editIconContainer}
        onPress={handleEditProfile}
        underlayColor="#ccc" // Change the background color when pressed
        activeOpacity={0.7} // Adjust the opacity when pressed
      >
        <MaterialIcons name="edit" size={22} color="#fff" />
      </TouchableHighlight>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      marginBottom: 8,
      backgroundColor: theme.dark ? theme.colors.elevation.level3 : "#f5f5f5",
      borderRadius: 20,
    },
    profileInfo: {
      flex: 2,
      paddingTop: 8,
      marginLeft: 16,
    },
    profileImage: {
      width: 120,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "auto",
      marginTop: 24,
    },
    profileLabel: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 4,
    },
    profileValue: {
      fontSize: 16,
      marginBottom: 8,
    },
    editIconContainer: {
      padding: 10,
      backgroundColor: theme.colors.primary,
      borderRadius: 25,
      position: "absolute",
      top: 8,
      right: 8,
    },
  });

export default ProfileInfo;
