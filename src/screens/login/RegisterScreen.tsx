// src/screens/Login/RegisterScreen.tsx
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

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage('Preencha todos os campos obrigatórios.');
      return false;
    }

    if (password.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    console.log('[RegisterScreen] Iniciando cadastro...');

    try {
      await register(name.trim(), email.trim(), password);
      console.log('[RegisterScreen] Cadastro concluído com sucesso');

      
      navigation.reset({
        index: 0,
         routes: [{ name: 'Home' }],

      });
    } catch (err: any) {
      console.log('[RegisterScreen] Erro no cadastro', err);
      let message = 'Não foi possível criar sua conta. Tente novamente.';

      if (err?.code === 'auth/email-already-in-use') {
        message = 'Este e-mail já está em uso. Tente fazer login.';
      } else if (err?.code === 'auth/invalid-email') {
        message = 'E-mail inválido. Verifique o formato.';
      } else if (err?.code === 'auth/weak-password') {
        message = 'A senha é muito fraca. Use pelo menos 6 caracteres.';
      } else if (typeof err?.message === 'string') {
        message = err.message;
      }

      setErrorMessage(message);
    } finally {
      setSubmitting(false);
      console.log('[RegisterScreen] Finalizou fluxo de cadastro');
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

        <Text style={styles.tagline}>Criar conta de colaborador</Text>

        <Text style={styles.description}>
          Preencha seus dados para acessar trilhas personalizadas, acompanhar seu
          progresso e se preparar para o futuro do trabalho.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: Guilherme Rezende"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
          />

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
            placeholder="Crie uma senha"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>Confirme a senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Repita a senha"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {errorMessage && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <AppButton
            label={submitting ? 'Criando conta...' : 'Criar conta'}
            onPress={handleRegister}
            fullWidth
            loading={submitting}
            disabled={submitting}
          />
        </View>

        <Text style={styles.footerText}>
          Já tem uma conta?{' '}
          <Text
            style={styles.linkText}
            onPress={() => navigation.replace('Login')}
          >
            Fazer login
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

export default RegisterScreen;
