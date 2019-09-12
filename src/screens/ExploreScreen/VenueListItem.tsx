import React, { FunctionComponent } from 'react'

import { Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native'

import { Spacing, Colors, Typography, Radius } from '../../styles'
import { NavigationScreenProps } from 'react-navigation'

interface VenueListItemProps extends NavigationScreenProps {
  id: string
  name: string
  description: string
  address: string
  lowestPrice: string
  cover: string
}
const listItemStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    borderRadius: Radius.base,
    padding: Spacing.smaller,
    flexDirection: 'row',
    marginBottom: Spacing.small,
    width: Spacing.full,
    alignItems: 'center'
  },
  photoContainer: {
    paddingHorizontal: Spacing.smallest
  },
  contentContainer: {
    paddingHorizontal: Spacing.smallest,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    flexGrow: 1
  },
  linkContainer: {
    flexShrink: 1,
    paddingHorizontal: Spacing.smaller
  },
  caretWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  photo: {
    borderRadius: Radius.base,
    height: Spacing.x64,
    width: Spacing.x64
  },

  textWrapper: {
    flexDirection: 'row',
    width: Spacing.full
  },
  nameText: {
    color: Colors.gray700,
    fontWeight: Typography.semibold,
    fontSize: Typography.textSm,
    flex: 1,
    flexWrap: 'wrap',
    width: Spacing.full
  },
  addressText: {
    color: Colors.gray500,
    fontWeight: Typography.thin,
    fontSize: Typography.textSm,
    marginBottom: Spacing.tiny
  },
  lowestPriceText: {
    color: Colors.gray600
  },
  caretText: {
    color: Colors.gray600,
    fontWeight: Typography.semibold
  }
})

const VenueListItem: FunctionComponent<VenueListItemProps> = ({
  id,
  name,
  address,
  lowestPrice,
  cover,
  navigation
}) => {
  return (
    <View style={listItemStyles.wrapper}>
      <View style={listItemStyles.photoContainer}>
        <Image
          style={listItemStyles.photo}
          source={{
            uri: cover
          }}
        />
      </View>
      <View style={listItemStyles.contentContainer}>
        <View>
          <View style={listItemStyles.textWrapper}>
            <Text style={listItemStyles.nameText}>{name}</Text>
          </View>
          <View style={listItemStyles.textWrapper}>
            <Text style={listItemStyles.addressText}>{address}</Text>
          </View>
        </View>
        <Text
          style={listItemStyles.lowestPriceText}>{`Desde ${lowestPrice}`}</Text>
      </View>
      <TouchableHighlight
        underlayColor={Colors.gray200}
        style={listItemStyles.linkContainer}
        onPress={() => navigation.navigate('Details', { id: id, name: name })}>
        <View style={listItemStyles.caretWrapper}>
          <Text style={listItemStyles.caretText}>{'>'}</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

export default VenueListItem
