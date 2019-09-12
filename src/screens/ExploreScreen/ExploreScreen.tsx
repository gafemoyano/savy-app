import React, { useState, FunctionComponent } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import {
  Text,
  View,
  ScrollView,
  Modal,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native'
import {
  NavigationScreenProps,
  NavigationScreenComponent
} from 'react-navigation'
import VenueListItem from './VenueListItem'
import { Spacing, Colors, Radius } from '../../styles'

const DEFAULT_CENTER = { lat: 4.6766228, lng: -74.0483046 }

const VENUE_SEARCH_QUERY = gql`
  query VenueSearchQuery(
    $cursor: String
    $centerLat: Float!
    $centerLng: Float!
  ) {
    venuesConnection(
      first: 12
      after: $cursor
      centerLat: $centerLat
      centerLng: $centerLng
    ) {
      edges {
        cursor
        node {
          id
          name
          description
          address
          lowestPrice
          cover
          distanceTo(lat: $centerLat, lng: $centerLng)
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

interface FiltersModalProps {
  modalVisible: boolean
  setModalVisible: (boolean) => void
}

const FiltersModal: FunctionComponent<FiltersModalProps> = ({
  modalVisible,
  setModalVisible
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <TouchableOpacity
        style={{
          backgroundColor: 'rgba(24,35,62,0.7)',
          paddingTop: 250,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => {
          setModalVisible(!modalVisible)
        }}>
        <View
          style={{
            backgroundColor: Colors.white,
            flex: 1,
            width: Spacing.full,
            borderTopRightRadius: Radius.xl,
            borderTopLeftRadius: Radius.xl
          }}>
          <Text>Hello World!</Text>

          <TouchableHighlight
            onPress={() => {
              setModalVisible(false)
            }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}
interface FiltersModalProps {
  modalVisible: boolean
  setModalVisible: (boolean) => void
}

// const FiltersModal: FunctionComponent<FiltersModalProps> = ({
//   modalVisible,
//   setModalVisible
// }) => {
//   return (
//     <Modal animationType="fade" transparent={true} visible={modalVisible}>
//       <TouchableOpacity
//         style={{
//           backgroundColor: 'rgba(24,35,62,0.7)',
//           paddingTop: 250,
//           flex: 1,
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}
//         onPress={() => {
//           setModalVisible(!modalVisible)
//         }}>
//         <View
//           style={{
//             backgroundColor: Colors.white,
//             flex: 1,
//             width: Spacing.full,
//             borderTopRightRadius: Radius.xl,
//             borderTopLeftRadius: Radius.xl
//           }}>
//           <Text>Hello World!</Text>

//           <TouchableHighlight
//             onPress={() => {
//               setModalVisible(false)
//             }}>
//             <Text>Hide Modal</Text>
//           </TouchableHighlight>
//         </View>
//       </TouchableOpacity>
//     </Modal>
//   )
// }

const ExploreScreen: NavigationScreenComponent<NavigationScreenProps> = ({
  navigation
}) => {
  const { loading, error, data } = useQuery(VENUE_SEARCH_QUERY, {
    variables: { centerLat: DEFAULT_CENTER.lat, centerLng: DEFAULT_CENTER.lng }
  })
  const [modalVisible, setModalVisible] = useState(false)

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>{`Error: ${error}`}</Text>
  let venues = data.venuesConnection.edges.map(edge => edge.node)

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.gray100,
        paddingHorizontal: Spacing.base,
        paddingTop: Spacing.small
      }}>
      <View>
        <TouchableHighlight
          onPress={() => {
            setModalVisible(true)
          }}>
          <Text>Filtros</Text>
        </TouchableHighlight>
        <FiltersModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {venues.map(
            (venue: {
              id: string
              name: string
              address: string
              description: string
              lowestPrice: string
              cover: string
            }) => (
              <VenueListItem
                key={venue.id}
                id={venue.id}
                name={venue.name}
                address={venue.address}
                description={venue.description}
                lowestPrice={venue.lowestPrice}
                cover={venue.cover}
                navigation={navigation}
              />
            )
          )}
        </View>
      </View>
    </ScrollView>
  )
}
ExploreScreen.navigationOptions = {
  title: 'Centros deportivos'
}
export default ExploreScreen
