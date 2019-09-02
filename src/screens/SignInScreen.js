import React, { useState } from "react";
import { Alert, AsyncStorage, Button, TextInput, View } from "react-native";
import FacebookSignIn from "../components/FacebookSignIn";
import GoogleLogin from "../components/GoogleSignIn";

export default function SignInScreen(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
        <Button title="Sign in email" onPress={() => _signInAsync(props, email, password)} />
      </View>
      <FacebookSignIn></FacebookSignIn>
      <GoogleLogin></GoogleLogin>
    </View>
  )
}

async function _signInAsync(props, email, password) {
  await AsyncStorage.setItem("userSessionToken", "abc")
  Alert.alert(`Email:" ${email} , Password: ${password}`)
  props.navigation.navigate("Explore")
}
