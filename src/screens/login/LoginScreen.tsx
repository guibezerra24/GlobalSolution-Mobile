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

      <Text style={styles.tagline}>
        Plataforma inteligente de upskilling e reskilling.
      </Text>

      <Text style={styles.description}>
        Desenvolva novas habilidades com trilhas personalizadas, inteligência
        artificial e dados que impulsionam sua carreira dentro da empresa.
      </Text>

      <AppButton
        label="Começar minha jornada"
        onPress={handleEnter}
        fullWidth
      />

      <Text style={styles.helper}>
        Ao acessar, você verá trilhas recomendadas, progresso nas competências
        e oportunidades internas conectadas ao seu perfil.
      </Text>

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
    marginBottom: spacing.xs,
  },
  tagline: {
    ...typography.titleM,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  helper: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.md,
    lineHeight: 16,
  },
  footer: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.lg,
  },
});

export default LoginScreen;
