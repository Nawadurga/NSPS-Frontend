import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import Loading from "../../components/Loading";
import ErrorComponent from "../../components/ErrorComponent";
import { useGetUserByIdQuery } from "../../redux/userAPISlice";
import ProfileInfo from "./ProfileInfo";
import VehicleInfo from "./VehicleInfo";
import Routes from "../../navigation/Routes";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { useNavigation } from "@react-navigation/native";
import ProtectedComponent from "../../components/ProtectedComponent";

const UserProfile = ({ route }) => {
  const navigation = useNavigation();
  const [userIdToQuery, setUserIdToQuery] = useState();

  // For Admin to watch all users data
  const userIdFromRoute = route?.params?.userId;

  // default user Id
  const { userId } = useSelector(selectUser);

  useEffect(() => {
    if (userIdFromRoute) {
      setUserIdToQuery(userIdFromRoute);
    } else {
      setUserIdToQuery(userId);
    }
  }, [userIdFromRoute, userId]);

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useGetUserByIdQuery(userIdToQuery);

  if (isLoading) {
    return <Loading height={600} style={{ marginVertical: 10 }} />;
  }

  if (isError) {
    let errMsg = error?.data?.message || "Please try again later.";
    return <ErrorComponent errorMessage={errMsg} />;
  }

  const handleAddVehicle = () => {
    navigation.navigate(Routes.ADD_VEHICLE_SCREEN, { userId: userIdToQuery });
  };
  const handleVehicleEntryExitStaus = () => {
    navigation.navigate(Routes.PAY_SCREEN, { user: user });
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileInfo user={user} />
      {user.vehicles.map((vehicle, index) => (
        <VehicleInfo key={index} vehicle={vehicle} index={index} />
      ))}
      <Button
        mode="contained"
        onPress={handleAddVehicle}
        style={styles.editButton}
      >
        Add Vehicle
      </Button>

      <ProtectedComponent>
        <Button
          mode="contained"
          onPress={handleVehicleEntryExitStaus}
          style={[styles.editButton, { marginBottom: 50 }]}
        >
          Vehicle Entry Exit Status
        </Button>
      </ProtectedComponent>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:12
  },
  editButton: {
    marginTop: 8,
  },
});

export default UserProfile;
