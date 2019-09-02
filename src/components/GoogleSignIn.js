import * as Google from "expo-google-app-auth";
import React from "react";
import { Alert, Button, View } from "react-native";

export default function GoogleLogin(props) {
  return (
      <View>
        <Button title="Sign in google" onPress={_signInWithGoogleAsync} />
      </View>
  )
}


async function _signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId:
        "724529379941-92km9sef764624km78hathral2ue2m1o.apps.googleusercontent.com",
      iosClientId:
        "724529379941-17ggu3fo5r2eagcj0hvmmuvmt134lisq.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    })
    if (result.type === "success") {
      const google_response = await result
      Alert.alert(
        "Logged in!",
        `Hi ${google_response.user.name} - ${google_response.user.givenName} - ${google_response.user.familyName}! This is you're id: ${google_response.user.id} and this is you're email: ${google_response.user.email} `
      )
      return result.accessToken
    } else {
      Alert.alert("Log in canceled!")
      return { cancelled: true }
    }
  } catch (e) {
    Alert.alert(`Google Login Error: ${e}`)
    return { error: true }
  }
}