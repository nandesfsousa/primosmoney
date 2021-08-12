/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ForgoutPasswordScreen from '../screens/ForgoutPasswordScreen';
import { RootStackParamList, AuthStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import { AuthProvider } from '../contexts/authenticate';
import AuthContext from '../contexts/authenticate'
/**
 * 
 * export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { signed, signIn, user } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <AuthProvider>
        {signed ? <RootNavigator /> : <AuthNavigator />}
      </AuthProvider>
    </NavigationContainer>
  );
};

 */
const Navigation: React.FC = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AuthVerify/>
      </AuthProvider>
    </NavigationContainer>
  );
}

const AuthVerify: React.FC = () => {
  const { signed } = useContext(AuthContext);
  return signed ? <RootNavigator /> : <AuthNavigator />
}
// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

const Auth = createStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="Register" component={RegisterScreen} />
      <Auth.Screen name="ForgoutPassword" component={ForgoutPasswordScreen}/>
    </Auth.Navigator>
  );
}

export default Navigation