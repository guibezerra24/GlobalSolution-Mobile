// src/navigation/RootNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { colors } from '../theme';

import LoginScreen from '../screens/login/LoginScreen';
import HomeScreen from '../screens/home/HomeScreen';
import TracksScreen from '../screens/Tracks/TracksScreen';
import TrackDetailScreen from '../screens/trackdetail/TrackDetailScreen';
import TrackFormScreen from '../screens/Tracks/TrackFormScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'SkillBoost AI' }}
      />
      <Stack.Screen
        name="Tracks"
        component={TracksScreen}
        options={{ title: 'Trilhas recomendadas' }}
      />
      <Stack.Screen
        name="TrackDetail"
        component={TrackDetailScreen}
        options={{ title: 'Detalhe da trilha' }}
      />
      <Stack.Screen
        name="TrackForm"
        component={TrackFormScreen}
        options={{ title: 'Gerenciar trilha' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Meu perfil' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
