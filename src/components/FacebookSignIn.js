import * as Facebook from "expo-facebook"
import React from "react"
import gql from "graphql-tag"
import { Alert, Button, View } from "react-native"
import { useMutation } from "@apollo/react-hooks";

const SIGNIN_FACEBOOK = gql`
  mutation signInFacebook {
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

export default function FacebookLogin(props) {
  const [signInFacebookBackend, { loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(SIGNIN_FACEBOOK)
  return (
    <View>
      <Button
        title="Sign in facebook"
        onPress={() => _signInWithFacebookAsync(props, signInFacebookBackend)}
      />
    </View>
  )
}

async function _signInWithFacebookAsync(props, signInFacebookBackend) {
  try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions
    } = await Facebook.logInWithReadPermissionsAsync("1720372338046923", {
      permissions: ["public_profile", "email"]
    })
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,first_name,middle_name,last_name,email&access_token=${token}`
      )
      const fb_response = await response.json()
      signInFacebookBackend({ variables: {uid: fb_response.id, email: fb_response.email, firstName: fb_response.first_name, middleName: fb_response.middle_name, lastName: fb_response.last_name} })
      Alert.alert(`Loading:` + mutationLoading + `, Error:` + mutationError + `, Data:` + mutationData)
      props.navigation.navigate("Explore")
    } else {
      // type === 'cancel'
      Alert.alert("Log in canceled!")
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`)
  }
}
