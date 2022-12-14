import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import TabNavigation from './src/screens/TabNavigation';
import Comment from './src/screens/Comment';
import UsersProfile from './src/screens/UsersProfile';
import RegisterAddPhoto from './src/screens/RegisterAddPhoto';


export default function App() {

  const Stack = createNativeStackNavigator();
  
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
          <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
          <Stack.Screen name='Comment' component={Comment} options={{headerShown: false}} />
          <Stack.Screen name='UsersProfile' component={UsersProfile} options={{headerShown: false}} />
          <Stack.Screen name='RegisterAddPhoto' component={RegisterAddPhoto} options={{headerShown: false}} />
          <Stack.Screen name='TabNavigation' component={TabNavigation} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer> 
    )
}