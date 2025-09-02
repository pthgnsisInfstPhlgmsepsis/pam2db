import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import Home from './components/Home';
import { NavigationContainer } from '@react-navigation/native';
import Edit, { EditModal } from './components/Edit';


const RootStack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName='Home'>
        <RootStack.Screen 
          name='Home' 
          component={Home} 
          options={{ title: 'Página inicial', headerTitleAlign: 'center' }}
        />
        <RootStack.Screen 
          name='Edit' 
          component={Edit} 
          options={{ title: 'Editar Livros', headerTitleAlign: 'center' }}
        />
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
          <RootStack.Screen
            name='EditLivro'
            component={EditModal}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}