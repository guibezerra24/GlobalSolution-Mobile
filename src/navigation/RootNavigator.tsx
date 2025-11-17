// src/navigation/RootNavigator.tsx
import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { colors, spacing, typography } from '../theme';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/login/LoginScreen';
import HomeScreen from '../screens/home/HomeScreen';
import TracksScreen from '../screens/Tracks/TracksScreen';
import TrackDetailScreen from '../screens/trackdetail/TrackDetailScreen';
import TrackFormScreen from '../screens/Tracks/TrackFormScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>
          Carregando sua experiência SkillBoost AI...
        </Text>
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      {user ? (
        <>
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
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});

export default RootNavigator;
