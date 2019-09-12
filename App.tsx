import React from 'react'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { API_HOST } from './src/config'

import VenueDetails from './src/screens/VenueDetails/VenueDetails'

import { ApolloProvider } from '@apollo/react-hooks'

export const link = createHttpLink({
  uri: `${API_HOST}/graphql/`
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  )
}
