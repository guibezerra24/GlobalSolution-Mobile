// src/screens/Login/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../../theme';
import AppButton from '../../components/Button/AppButton';
import { useAuth } from '../../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Preencha e-mail e senha para continuar.');
      return;
    }

    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      
    } catch (err: any) {
      setErrorMessage(err.message || 'Não foi possível autenticar.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.logo}>SkillBoost AI</Text>

        <Text style={styles.tagline}>
          Plataforma inteligente de upskilling e reskilling.
        </Text>

        <Text style={styles.description}>
          Acesse sua conta para visualizar trilhas personalizadas, acompanhar
          seu progresso e se preparar para o futuro do trabalho.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>E-mail corporativo</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: voce@empresa.com"
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {errorMessage && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <AppButton
            label={submitting ? 'Entrando...' : 'Entrar'}
            onPress={handleLogin}
            fullWidth
          />
        </View>

        <Text style={styles.helper}>
          Dica: cadastre um usuário de teste no recurso <Text style={styles.helperHighlight}>/users</Text> do MockAPI
          com nome, e-mail e senha para simular o colaborador.
        </Text>

        <Text style={styles.footer}>Global Solution 2025 • FIAP</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    justifyContent: 'center',
    gap: spacing.md,
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  tagline: {
    ...typography.titleM,
    color: colors.primary,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  form: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
  },
  helper: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  helperHighlight: {
    fontWeight: '600',
    color: colors.primary,
  },
  footer: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

export default LoginScreen;
