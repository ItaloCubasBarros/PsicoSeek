
import { StatusBar,  } from 'react-native';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/Routes'


export default function App() {
  return(
      <NavigationContainer>
        <StatusBar backgroundColor="#1c1c1c" barStyle="light-content"></StatusBar>
        <Routes />
      </NavigationContainer>
  )
}