// src/screens/Login/LoginScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const handleEnter = () => {
    // Por enquanto não teremos autenticação real.
    // Apenas navegamos para a Home.
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SkillBoost AI</Text>
      <Text style={styles.subtitle}>
        Bem-vindo à sua jornada de upskilling e reskilling.
      </Text>

      <Text style={styles.description}>
        Aqui você vai descobrir trilhas personalizadas, desenvolver novas
        competências e se preparar para o futuro do trabalho.
      </Text>

      <Pressable style={styles.primaryButton} onPress={handleEnter}>
        <Text style={styles.primaryButtonText}>Entrar na plataforma</Text>
      </Pressable>

      <Text style={styles.footer}>
        Global Solution 2025 • FIAP
      </Text>
    </View>
  );
};

const PRIMARY_COLOR = '#4C6FFF';
const BACKGROUND_COLOR = '#050817';
const TEXT_COLOR = '#FFFFFF';
const MUTED_TEXT_COLOR = '#A1A5B7';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: TEXT_COLOR,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: MUTED_TEXT_COLOR,
    marginBottom: 24,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  primaryButtonText: {
    color: TEXT_COLOR,
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    fontSize: 12,
    color: MUTED_TEXT_COLOR,
  },
});

export default LoginScreen;
