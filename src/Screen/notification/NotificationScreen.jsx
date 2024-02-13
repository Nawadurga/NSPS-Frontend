import React, { useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, List, Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { useGetNotificationQuery } from "../../redux/notificationAPISlice";
import Loading from "../../components/Loading";
import ErrorComponent from "../../components/ErrorComponent";
import DisplayInfo from "../../components/DisplayInfo";

const NotificationScreen = () => {
  const { userId } = useSelector(selectUser);

  const {
    data: notificationsData,
    isLoading,
    isError,
    error,
  } = useGetNotificationQuery(userId);



  if (isLoading) {
    return <Loading height={600} style={{ marginVertical: 10 }} />;
  }

  if (isError) {
    let errMsg = error?.data?.message || "Please try again later.";
    return <ErrorComponent errorMessage={errMsg} />;
  }

  const renderNotificationCard = ({ item }) => (
    <List.Item
      title={item.title}
      description={
        <>
          <Text numberOfLines={2}>{item.subtitle}</Text>
          <Text style={styles.dateTime}>{item.date}</Text>
        </>
      }
      left={() => <List.Icon icon={"bell-ring"} />}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notificationsData}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationCard}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={<DisplayInfo info={"No notifications"} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dateTime: {
    fontSize: 12,
    color: "#999999",
  },
});

export default NotificationScreen;
