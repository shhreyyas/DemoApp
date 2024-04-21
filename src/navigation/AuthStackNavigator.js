import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SIGNIN } from './screenName';
import SignInScreen from '@features/auth/signIn';

const AuthStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SIGNIN}
        component={SignInScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
