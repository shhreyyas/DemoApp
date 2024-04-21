import {View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainSplash from '@features/splash';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {AUTHSTACK, BOTTOMTAB, HOME, SPLASH} from './screenName';
import HomeScreen from '@features/home';
import colors from '@styles/colors';
import AuthStackNavigator from './AuthStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';

const RootStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.WHITE} barStyle="dark-content" />
      <Stack.Navigator initialRouteName={SPLASH}>
        <Stack.Screen
          name={SPLASH}
          component={MainSplash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={AUTHSTACK}
          component={AuthStackNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={BOTTOMTAB}
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={HOME}
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
