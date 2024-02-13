import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import registerForPushNotificationsAsync from "../utils/registerForPushNotificationsAsync";
import { useCreateNotificationTokenMutation } from "../redux/notificationAPISlice";
import { notificationTokenSended, selectUser } from "../redux/userSlice";

const useSendExpoToken = () => {
  const { userId, isSendNotificationToken } = useSelector(selectUser);
  const dispatch = useDispatch();


  const [createNotificationToken] = useCreateNotificationTokenMutation();

  useEffect(() => {
    const sendExpoToken = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        await createNotificationToken({
          userId: userId,
          notificationToken: {
            pushNotificationToken: token.data,
          },
        });
        dispatch(notificationTokenSended());
      } catch (error) {
      }
    };

    if (!isSendNotificationToken) {
      sendExpoToken();
    }
  }, [userId, createNotificationToken, isSendNotificationToken]);

  return null; // or any value you want to return
};

export default useSendExpoToken;
