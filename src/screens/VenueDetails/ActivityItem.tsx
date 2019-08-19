import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Typography, Colors, Spacing, Radius } from '../../styles'

export interface Activity {
  id: number
  name: string
  description: string
  durationMinutes: number
}

const ActivityItem: FunctionComponent<Activity> = props => {
  let { id, name, description, durationMinutes } = props
  return (
    <View key={id} style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.duration}>{`${durationMinutes} mins.`}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  )
}

export default ActivityItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.smaller,
    marginBottom: Spacing.base,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: Spacing.hairline,
    borderColor: Colors.gray400,
    borderRadius: Radius.base,
    flex: 1,
    width: Spacing.full
  },
  name: {
    fontWeight: Typography.semibold,
    fontSize: Typography.textBase,
    color: Colors.gray700
  },
  duration: {
    fontSize: Typography.textSm,
    color: Colors.gray500,
    marginBottom: Spacing.smallest
  },
  description: {
    fontSize: Typography.textBase,
    color: Colors.gray700
  }
})
