import { useMutation } from "@apollo/react-hooks"
import * as Facebook from "expo-facebook"
import gql from "graphql-tag"
import React, { useContext } from "react"
import { Alert, AsyncStorage, Button, Text, View } from "react-native"
import { NavigationContext } from "react-navigation"

const SIGN_IN_FACEBOOK = gql`
  mutation signInFacebook(
    $uid: String!
    $email: String!
    $firstName: String!
    $middleName: String!
    $lastName: String!
  ) {
    signInFacebook(
      uid: $uid
      email: $email
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
    ) {
      authenticationToken
    }
  }
`

export default function FacebookLogin() {
  const navigation = useContext(NavigationContext)
  const [signInFacebookMutation, { loading: mutationLoading }] = useMutation(
    SIGN_IN_FACEBOOK
  )
  if (mutationLoading) return <Text>Loading...</Text>
  return (
    <View>
      <Button
        title="Sign in facebook"
        onPress={() =>
          _signInWithFacebookAsync(navigation, signInFacebookMutation)
        }
      />
    </View>
  )
}

async function _signInWithFacebookAsync(navigation, signInFacebookMutation) {
  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      "1720372338046923",
      {
        permissions: ["public_profile", "email"]
      }
    )
    if (type === "success") {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,first_name,middle_name,last_name,email&access_token=${token}`
      )
      const faceBookResponse = await response.json()
      await _signInSavyBackend(
        navigation,
        signInFacebookMutation,
        faceBookResponse
      )
    } else {
      Alert.alert("Facebook Login canceled!")
    }
  } catch ({ message }) {
    Alert.alert(`Facebook Login Error: ${message}`)
  }
}

async function _signInSavyBackend(
  navigation,
  signInFacebookMutation,
  faceBookResponse
) {
  try {
    const savyBackendResponse = await signInFacebookMutation({
      variables: {
        uid: faceBookResponse.id,
        email: faceBookResponse.email,
        firstName: faceBookResponse.first_name,
        middleName: faceBookResponse.middle_name,
        lastName: faceBookResponse.last_name
      }
    })
    await AsyncStorage.setItem(
      "userSessionToken",
      savyBackendResponse.data.signInFacebook.authenticationToken
    )
    navigation.navigate("Explore")
  } catch ({ message }) {
    Alert.alert(`Savy Backend: ${message.split(':').pop()}`)
  }
}
