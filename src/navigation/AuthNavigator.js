import { createAppContainer, createStackNavigator, createSwitchNavigator } from "react-navigation";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import EmailSignInScreen from "../screens/EmailSignInScreen";
import SignInScreen from "../screens/SignInScreen";


const AuthStack = createStackNavigator({ 
  SignIn: SignInScreen, 
  EmailSignIn: EmailSignInScreen,
 });

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