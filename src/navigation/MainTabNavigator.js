import React from "react"
import { Ionicons } from "@expo/vector-icons"
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation"
import ExploreScreen from "../screens/ExploreScreen"

const ExploreStack = createStackNavigator({
  Explore: { screen: ExploreScreen },
})

export default createAppContainer(
  createBottomTabNavigator(
    {
      Explore: { screen: ExploreStack }
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state
          let iconName
          if (routeName === "Explore") {
            iconName = `ios-information-circle${focused ? "" : "-outline"}`
          }
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={25} color={tintColor} />
        }
      }),
      tabBarOptions: {
        activeTintColor: "tomato",
        inactiveTintColor: "gray"
      }
    }
  )
)