import { Notifications } from "expo"
import Constants from "expo-constants"
import { AsyncStorage } from "react-native"

export default async function registerForPushNotificationsAsync() {
  let token
  if (Constants.isDevice) {
    token = await Notifications.getExpoPushTokenAsync()
  } else {
    token = "01123581321345588144"
  }
  await AsyncStorage.setItem("expoToken", token)
  Notifications.addListener(_handleNotification)
}

function _handleNotification(notification) {
  alert(notification.data.data)
}
