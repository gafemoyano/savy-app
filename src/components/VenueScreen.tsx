import React from "react"
import gql from "graphql-tag"
import { StyleSheet, Text, View } from "react-native"

const VENUE_QUERY = gql`
  query VenueQuery {
    venue(id: "fit-for-all-sede-calle-94") {
      name
      city
      contactEmail
      id
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
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  )
}

export default VenueScreen
