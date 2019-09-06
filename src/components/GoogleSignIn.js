import { useMutation } from "@apollo/react-hooks"
import * as Google from "expo-google-app-auth"
import gql from "graphql-tag"
import React, { useContext } from "react"
import { Alert, AsyncStorage, Button, Text, View } from "react-native"
import { NavigationContext } from "react-navigation"

const SIGN_IN_GOOGLE = gql`
  mutation signInGoogle(
    $uid: String!
    $email: String!
    $firstName: String!
    $lastName: String!
  ) {
    signInGoogle(
      uid: $uid
      email: $email
      firstName: $firstName
      lastName: $lastName
    ) {
      authenticationToken
    }
  }
`

export default function GoogleLogin() {
  const navigation = useContext(NavigationContext)
  const [signInGoogleMutation, { loading: mutationLoading }] = useMutation(
    SIGN_IN_GOOGLE
  )
  if (mutationLoading) return <Text>Loading...</Text>
  return (
    <View>
      <Button
        title="Sign in google"
        onPress={() => _signInWithGoogleAsync(navigation, signInGoogleMutation)}
      />
    </View>
  )
}

async function _signInWithGoogleAsync(navigation, signInGoogleMutation) {
  try {
    const result = await Google.logInAsync({
      androidClientId:
        "724529379941-92km9sef764624km78hathral2ue2m1o.apps.googleusercontent.com",
      iosClientId:
        "724529379941-17ggu3fo5r2eagcj0hvmmuvmt134lisq.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    })
    if (result.type === "success") {
      const googleResponse = await result
      await _signInSavyBackend(navigation, signInGoogleMutation, googleResponse)
    } else {
      Alert.alert("Google Login canceled!")
    }
  } catch ({ message }) {
    Alert.alert(`Google Login Error: ${message}`)
  }
}

async function _signInSavyBackend(
  navigation,
  signInGoogleMutation,
  googleResponse
) {
  try {
    const savyBackendResponse = await signInGoogleMutation({
      variables: {
        uid: googleResponse.user.id,
        email: googleResponse.user.email,
        firstName: googleResponse.user.givenName,
        lastName: googleResponse.user.familyName
      }
    })
    Alert.alert(savyBackendResponse.data.signInGoogle.authenticationToken)
    await AsyncStorage.setItem(
      "userSessionToken",
      savyBackendResponse.data.signInGoogle.authenticationToken
    )
    navigation.navigate("Explore")
  } catch ({ message }) {
    Alert.alert(`Savy Backend: ${message.split(':').pop()}`)
  }
}
