import { createAppContainer, createStackNavigator, createSwitchNavigator } from "react-navigation";
import AuthLoadingScreen from "../screens/auth/AuthLoadingScreen";
import EmailSignInScreen from "../screens/auth/EmailSignInScreen";
import SignInScreen from "../screens/auth/SignInScreen";


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