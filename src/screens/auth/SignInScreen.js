import React from "react";
import { Button, View } from "react-native";
import FacebookSignIn from "../../components/FacebookSignIn";
import GoogleLogin from "../../components/GoogleSignIn";
import registerForPushNotificationsAsync from "../../utils/PushNotifications"

export default function SignInScreen(props) {
  registerForPushNotificationsAsync()
  return (
    <View>
      <View>
        <Button title="Sign in email" onPress={() => props.navigation.navigate("EmailSignIn")} />
      </View>
      <FacebookSignIn></FacebookSignIn>
      <GoogleLogin></GoogleLogin>
    </View>
  )
}
