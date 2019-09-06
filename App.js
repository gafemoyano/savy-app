import React from "react"
import { View, StyleSheet } from "react-native"
import AppNavigator from "./src/navigation/AppNavigator"
import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"

export default function App() {
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
  link: new HttpLink({ uri: "http://192.168.0.13:3000/graphql" })
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
})
