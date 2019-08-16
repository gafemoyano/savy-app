import React from "react"
import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import gql from "graphql-tag"
import VenueScreen from "./src/components/VenueScreen"

import { ApolloProvider } from "@apollo/react-hooks"

export const link = createHttpLink({
  uri: "http://192.168.0.7:3000/graphql/"
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <VenueScreen />
    </ApolloProvider>
  )
}
