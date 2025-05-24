import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from './Auth';
import Home from './Home';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator id={undefined} initialRouteName="Auth">
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeDrawer"
        component={Home}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
