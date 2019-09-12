import React from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { API_HOST } from './src/config'
import * as Permissions from 'expo-permissions'

export const link = createHttpLink({
  uri: `${API_HOST}/graphql/`
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

async function _askForPermissions() {
  const { status } = await Permissions.askAsync(
    Permissions.NOTIFICATIONS,
    Permissions.LOCATION
  )
  if (status !== 'granted') {
    alert(
      '¡Para una mejor experiencia habilita los permisos de notificaciones y localización!'
    )
  }
}

export default function App() {
  _askForPermissions()
  return (
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  )
}
