// src/screens/Login/LoginScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';
import AppButton from '../../components/Button/AppButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const handleEnter = () => {
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
        A plataforma que identifica gaps de competências, monta trilhas
        personalizadas e te prepara para o futuro do trabalho.
      </Text>

      <AppButton
        label="Entrar na plataforma"
        onPress={handleEnter}
        fullWidth={false}
      />

      <Text style={styles.footer}>Global Solution 2025 • FIAP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.titleM,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  footer: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.lg,
  },
});

export default LoginScreen;
