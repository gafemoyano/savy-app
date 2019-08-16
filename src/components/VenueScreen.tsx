import React from "react"
import gql from "graphql-tag"
import { StyleSheet, Text, View } from "react-native"
import { useQuery } from "@apollo/react-hooks"

const VENUE_QUERY = gql`
  query VenueQuery {
    venue(id: "fit-for-all-sede-calle-94") {
      id
      name
      city
      contactEmail
      cover
      activityCount
      address
    }
  }
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})

function VenueScreen() {
  const { loading, error, data } = useQuery(VENUE_QUERY)
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error! ${error.message}</Text>
  let venue = data.venue
  return (
    <View style={styles.container}>
      <Text>{venue.name}</Text>
      <Text>{venue.city}</Text>
      <Text>{venue.contactEmail}</Text>
      <Text>{venue.address}</Text>
      <Text>{venue.cover}</Text>
    </View>
  )
}

export default VenueScreen
