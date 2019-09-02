import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation"
import SignInScreen from "../screens/SignInScreen"
import AuthLoadingScreen from "../screens/AuthLoadingScreen"

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
)