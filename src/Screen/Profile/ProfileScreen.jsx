import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import Routes from "../../navigation/Routes";
import UserList from "./UserList";
import { useEffect } from "react";
import ProtectedComponent from "../../components/ProtectedComponent";
import UserProfile from "./UserProfile";

const ProfileScreen = ({ navigation }) => {
  const { userId, isAdmin } = useSelector(selectUser);

  const handleAddUser = () => {
    navigation.navigate(Routes.ADD_USER_SCREEN);
  };
  const handleSearchUser = () => {
    navigation.navigate(Routes.USER_SEARCH_SCREEN);
  };

  return (
    <ScrollView style={styles.container}>
      <ProtectedComponent unProtectedComponent={<UserProfile />}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 16,
          }}
        >
          <Button mode="outlined" style={{ flex: 1 }} onPress={handleAddUser}>
            Add User
          </Button>
          <Button
            mode="outlined"
            style={{ marginLeft: 10, flex: 1 }}
            onPress={handleSearchUser}
          >
            Search User
          </Button>
        </View>
        <UserList />
      </ProtectedComponent>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editButton: {
    marginTop: 8,
    marginBottom: 50,
  },
});

export default ProfileScreen;
