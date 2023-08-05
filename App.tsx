import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import Account from './components/Account'
import { View, Button } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './components/LandingScreen'
import AllBathrooms from './components/AllBathrooms'

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={LandingScreen}
        />
        <Stack.Screen
          name='All Bathrooms'
          component={AllBathrooms}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}