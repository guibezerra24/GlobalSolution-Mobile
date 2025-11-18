// src/screens/login/RegisterScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
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

  const validate = () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage('Preencha todos os campos.');
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
      // 🔹 Cria o usuário no Firebase (Auth + Firestore)
      await register(name.trim(), email.trim(), password);

      console.log('[RegisterScreen] Cadastro concluído com sucesso');

      // 🔹 Não loga automático
      // 🔹 Mostra sucesso e volta pra tela de Login
      Alert.alert(
        'Conta criada com sucesso!',
        'Agora faça login para acessar sua conta.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ],
        { cancelable: false },
      );
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
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>SkillBoost AI</Text>
          <Text style={styles.subtitle}>Criar conta de colaborador</Text>
          <Text style={styles.description}>
            Preencha seus dados para acessar trilhas personalizadas, acompanhar
            seu progresso e se preparar para o futuro do trabalho.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu nome"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>E-mail corporativo</Text>
          <TextInput
            style={styles.input}
            placeholder="seu.email@empresa.com"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={styles.label}>Confirme a senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Repita a senha"
            placeholderTextColor={colors.textSecondary}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

          <AppButton
            label={submitting ? 'Criando conta...' : 'Criar conta'}
            onPress={handleRegister}
            disabled={submitting}
            loading={submitting}
            fullWidth
          />

          <Text style={styles.footerText}>
            Já tem uma conta?{' '}
            <Text
              style={styles.footerLink}
              onPress={() => navigation.replace('Login')}
            >
              Fazer login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.heading1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.heading3,
    color: colors.primary,
    marginTop: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  form: {
    marginTop: spacing.lg,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  input: {
    ...typography.body,
    color: colors.textPrimary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
  },
  error: {
    ...typography.caption,
    color: colors.error,
    marginBottom: spacing.md,
  },
  footerText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  footerLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default RegisterScreen;
