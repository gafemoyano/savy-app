import React from "react"
import { MaterialIcons } from "@expo/vector-icons"
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation"
import ExploreScreen from "../screens/ExploreScreen"
import MainProfileScreen from "../screens/profile/MainProfileScreen"
import GenericModal from "../modals/GenericModal"
import EditProfileScreen from "../screens/profile/EditProfileScreen"

const ExploreStack = createStackNavigator({
  Explore: ExploreScreen
})

const ProfileStack = createStackNavigator({
  MainProfile: MainProfileScreen,
  EditProfile: EditProfileScreen
})

const TabNavigatior = createBottomTabNavigator(
  {
    Explore: ExploreStack,
    Profile: ProfileStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === "Explore") {
          iconName = `explore`
        } else {
          iconName = `account-circle`
        }
        return <MaterialIcons name={iconName} size={25} color={tintColor} />
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
)

export default createAppContainer(
  createStackNavigator(
    {
      MainTabNavigator: TabNavigatior,
      GenericModal: GenericModal
    },
    {
      mode: "card",
      headerMode: "none"
    }
  )
)
