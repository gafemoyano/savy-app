import React, { FunctionComponent } from 'react'
import gql from 'graphql-tag'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { Colors, Spacing, Typography, Radius, Shadows } from '../../styles'
import ActivityList from './ActivityList'
import {
  NavigationScreenProp,
  NavigationScreenProps,
  NavigationScreenComponent
} from 'react-navigation'

const VENUE_QUERY = gql`
  query VenueQuery($id: ID!) {
    venue(id: $id) {
      id
      name
      city
      contactEmail
      cover
      logo
      activityCount
      address
      categories {
        id
        name
      }
      activities {
        id
        name
        description
        durationMinutes
      }
    }
  }
`
interface Params {
  id: string
}

const VenueDetails: NavigationScreenComponent<NavigationScreenProps> = ({
  navigation
}) => {
  const venueId = navigation.getParam('id', 'NO-ID')

  const { loading, error, data } = useQuery(VENUE_QUERY, {
    variables: { id: venueId }
  })
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error! ${error.message}</Text>
  let venue = data.venue
  let categories = venue.categories
  let activities = venue.activities
  let coverUrl = `${venue.cover}`
  let logoUrl = `${venue.logo}`

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.cover}
        source={{
          uri: coverUrl
        }}
      />
      <View style={styles.topPanel}>
        <View style={styles.header}>
          <Image
            style={styles.venueLogo}
            source={{
              uri: logoUrl
            }}
          />
          <View style={styles.titleWrapper}>
            <Text style={styles.venueName}>{venue.name}</Text>
            <Text
              style={
                styles.venueAddress
              }>{`${venue.address}, ${venue.city}`}</Text>
          </View>
        </View>
        <View style={styles.categoriesContainer}>
          {categories.map(category => {
            return (
              <View style={styles.categoryPill} key={category.id}>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
            )
          })}
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.activitiesTitle}>Actividades</Text>
        <ActivityList activities={activities} />

        <Text>{venue.contactEmail}</Text>
        <Text>{venue.address}</Text>
        <Text>{venue.cover}</Text>
        <Text>{coverUrl}</Text>
      </View>
    </ScrollView>
  )
}
VenueDetails.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam('name')
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue100,
    flexDirection: 'column'
  },
  cover: {
    width: Spacing.windowWidth,
    height: Math.round((Spacing.windowWidth * 2) / 5)
  },
  topPanel: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: Spacing.base,
    backgroundColor: Colors.white,
    marginBottom: Spacing.base,
    ...Shadows.base
  },
  header: {
    width: 'auto',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: Spacing.base
  },
  venueLogo: {
    borderRadius: Radius.base,
    height: Spacing.x72,
    width: Spacing.x72,
    paddingHorizontal: Spacing.base
  },
  titleWrapper: {
    flexDirection: 'column',
    paddingHorizontal: Spacing.small,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  venueName: {
    fontWeight: Typography.semibold,
    fontSize: Typography.textLg,
    color: Colors.gray700,
    marginBottom: Spacing.hairline
  },
  venueAddress: {
    color: Colors.gray500
  },
  categoriesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.tiny
  },
  categoryPill: {
    backgroundColor: Colors.gray200,
    color: Colors.gray800,
    paddingVertical: Spacing.smaller,
    paddingHorizontal: Spacing.small,
    fontWeight: Typography.semibold,
    marginHorizontal: Spacing.tiny,
    marginVertical: Spacing.smallest,
    borderRadius: Radius.full
  },
  categoryName: {
    color: Colors.gray700,
    fontWeight: Typography.medium
  },
  body: {
    backgroundColor: Colors.white,
    padding: Spacing.base,
    ...Shadows.base
  },
  activitiesTitle: {
    fontWeight: Typography.semibold,
    fontSize: Typography.textLg,
    color: Colors.gray700,
    marginBottom: Spacing.base
  },
  activitiesContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  }
})

export default VenueDetails
