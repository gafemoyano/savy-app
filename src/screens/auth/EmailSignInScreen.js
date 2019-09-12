import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import React, { useContext, useState } from "react"
import {
  Alert,
  AsyncStorage,
  Button,
  Text,
  TextInput,
  View
} from "react-native"
import { NavigationContext } from "react-navigation"

const SIGN_IN_EMAIL = gql`
  mutation signInEmail($email: String!, $password: String!, $expoToken: String!) {
    signInEmail(email: $email, password: $password, expoToken: $expoToken) {
      authenticationToken
    }
  }
`

export default function EmailSignInScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigation = useContext(NavigationContext)
  const [signInEmailMutation, { loading: mutationLoading }] = useMutation(
    SIGN_IN_EMAIL
  )
  if (mutationLoading) return <Text>Loading...</Text>
  return (
    <View>
      <View>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#abbabb"
          value={email}
          onChangeText={email => setEmail(email)}
        />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#abbabb"
          value={password}
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
        <Button
          title="Sign in email"
          onPress={() =>
            _signInAsync(navigation, email, password, signInEmailMutation)
          }
        />
      </View>
      <View>
        <Button
          title="Forgot you're password?"
          onPress={() => props.navigation.navigate("EmailSignIn")}
        />
      </View>
      <View>
        <Button
          title="Create an account"
          onPress={() => props.navigation.navigate("EmailSignIn")}
        />
      </View>
    </View>
  )
}

async function _signInAsync(navigation, email, password, signInEmailMutation) {
  try {
    const expoToken = await AsyncStorage.getItem('expoToken');
    const savyBackendResponse = await signInEmailMutation({
      variables: {
        email: email,
        password: password,
        expoToken: expoToken
      }
    })
    await AsyncStorage.setItem(
      "userSessionToken",
      savyBackendResponse.data.signInEmail.authenticationToken
    )
    navigation.navigate("Explore")
  } catch ({ message }) {
    Alert.alert(`Savy Backend: ${message.split(":").pop()}`)
  }
}
