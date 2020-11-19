import { useEffect } from "react";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import expoPushTokenApi from "../api/expoPushToken";
import logger from "../utility/logger";

export default useNotifications = (notificationListener) => {
  useEffect(() => {
    registerForNotifications();
    if (notificationListener) Notifications.addListener(notificationListener);
  }, []);

  const registerForNotifications = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();

      //expoPushTokenApi.register(token);
    } catch (error) {
      logger.log("Error getting a push token", error);
    }
  };
};
