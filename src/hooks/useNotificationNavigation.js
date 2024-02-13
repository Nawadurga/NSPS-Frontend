import { useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

const useNotificationNavigation = () => {
  const navigation = useNavigation();

  const responseListener = useRef();

  const handleNotificationReceived = (notification) => {
    const screen = notification.request.content.data?.screen;

    if (screen) {
      navigation.navigate(screen);
    }
  };

  useEffect(() => {
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        handleNotificationReceived(response.notification);
      });

    const handleNotifications = async () => {
      const lastNotificationResponse =
        await Notifications.getLastNotificationResponseAsync();

      if (lastNotificationResponse) {
        const { notification } = lastNotificationResponse;
        const dataFromNotification = notification.request.content.data;

        if (dataFromNotification && dataFromNotification.screen) {
          navigation.navigate(dataFromNotification.screen);
        }
      }
    };

    handleNotifications();

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
};

export default useNotificationNavigation;
