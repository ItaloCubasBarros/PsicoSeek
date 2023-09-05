
import { StatusBar,  } from 'react-native';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/Routes'


export default function App() {
  return(
      <NavigationContainer>
        <StatusBar backgroundColor="#38A69D" barStyle="light-content"></StatusBar>
        <Routes />
      </NavigationContainer>
  )
}