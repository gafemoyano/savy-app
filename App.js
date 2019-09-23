import { ApolloProvider } from "@apollo/react-hooks"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import React from "react"
import { StyleSheet, View, Alert } from "react-native"
import AppNavigator from "./src/navigation/AppNavigator"
import * as Permissions from "expo-permissions"

export default function App() {
  _askForPermissions()
  return (
    <View style={styles.container}>
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    </View>
  )
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: "http://192.168.0.7:3000/graphql" })
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
})

async function _askForPermissions() {
  const { status } = await Permissions.askAsync(
    Permissions.NOTIFICATIONS,
    Permissions.LOCATION
  )
  if (status !== "granted") {
    alert(
      "¡Para una mejor experiencia habilita los permisos de notificaciones y localización!"
    )
  }
}
