import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import ActivityItem, { Activity } from './ActivityItem'

interface ActivityListProps {
  activities: Activity[]
}

const ActivityList: FunctionComponent<ActivityListProps> = props => {
  let { activities } = props
  return (
    <View style={styles.container}>
      {activities.map(activity => (
        <ActivityItem
          key={activity.id}
          id={activity.id}
          name={activity.name}
          description={activity.description}
          durationMinutes={activity.durationMinutes}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center'
  }
})

export default ActivityList
