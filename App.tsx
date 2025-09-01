import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import Home from './components/Home';
import { NavigationContainer } from '@react-navigation/native';
import Edit from './components/Edit';


const RootStack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName='Home'>
        <RootStack.Screen name='Home' component={Home} />
        <RootStack.Screen name='Edit' component={Edit} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}