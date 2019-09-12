import React from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { API_HOST } from './src/config'

export const link = createHttpLink({
  uri: `${API_HOST}/graphql/`
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

export default function App(props) {
  return (
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  )
}
