import React from 'react';
import { AppRegistry } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import merge from 'deepmerge';
import Register from './src/Register';
import WortelJus from './assets/worteljus.json';
import TopNavbar from './src/TopNavbar';
import Login from './src/Login';
import MainScreen from './src/MainScreen';
import Athlete from './src/Athlete';
import WriteTag from './src/WriteTag';

export default function App() {

  const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
  const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

  const Stack = createStackNavigator();

  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <NavigationContainer theme={CombinedDefaultTheme}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{
         header:(props)=><TopNavbar {...props}/>
        }}>
          <Stack.Screen name="Login" component={Login} screenOptions={{
            headerShown:false
          }}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="MainScreen" component={MainScreen}/>
          <Stack.Screen name="Athlete" component={Athlete}/>
          <Stack.Screen name="WriteTag" component={WriteTag}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(WortelJus, () => App);