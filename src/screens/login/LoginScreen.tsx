// src/screens/Login/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';
import AppButton from '../../components/Button/AppButton';
import { useAuth } from '../../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Preencha e-mail e senha.');
      return;
    }

    setSubmitting(true);
    console.log('[LoginScreen] Iniciando login...');

    try {
      await login(email.trim(), password);
      console.log('[LoginScreen] Login concluído com sucesso');

      
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }], 
      });
    } catch (err: any) {
      console.log('[LoginScreen] Erro no login', err);

      let message = 'Não foi possível entrar. Verifique seus dados.';
      if (err?.code === 'auth/invalid-credential') {
        message = 'E-mail ou senha inválidos.';
      } else if (err?.code === 'auth/user-not-found') {
        message = 'Usuário não encontrado. Crie uma conta primeiro.';
      } else if (err?.code === 'auth/wrong-password') {
        message = 'Senha incorreta. Tente novamente.';
      } else if (typeof err?.message === 'string') {
        message = err.message;
      }

      setErrorMessage(message);
    } finally {
      setSubmitting(false);
      console.log('[LoginScreen] Finalizou fluxo de login');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.logo}>SkillBoost AI</Text>

        <Text style={styles.tagline}>Plataforma inteligente de upskilling e reskilling.</Text>

        <Text style={styles.description}>
          Acesse sua conta para visualizar trilhas personalizadas, acompanhar seu progresso
          e se preparar para o futuro do trabalho.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>E-mail corporativo</Text>
          <TextInput
            style={styles.input}
            placeholder="voce@empresa.com"
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
            loading={submitting}
            disabled={submitting}
          />
        </View>

        <Text style={styles.footerText}>
          Não tem conta ainda?{' '}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate('Register')}
          >
            Criar conta
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    justifyContent: 'center',
    gap: spacing.md,
  },
  logo: {
    fontSize: 28,
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
    marginTop: spacing.xs,
  },
  footerText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;
