import React from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { Text, View, ScrollView, Button, AsyncStorage } from "react-native"

const ALL_VENUE_QUERY = gql`
  query AllVenueQuery {
    allVenues {
      id
      name
      description
    }
  }
`

export default function HomeScreen(props) {
  _signOutAsync = async () => {
    await AsyncStorage.clear()
    props.navigation.navigate("Auth")
  }
  const { loading, error, data } = useQuery(ALL_VENUE_QUERY)
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error!!</Text>
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView>
        {data.allVenues.map((venue, key) => (
          <Text key={key}>{venue.name}</Text>
        ))}
      </ScrollView>
      <Button title="Sign out" onPress={this._signOutAsync} />
    </View>
  )
}
