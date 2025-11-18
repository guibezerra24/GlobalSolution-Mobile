// src/screens/Profile/ProfileScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';
import InfoCard from '../../components/Card/InfoCard';
import AppButton from '../../components/Button/AppButton';
import { useAuth } from '../../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair da SkillBoost AI neste dispositivo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            void logout();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Meu perfil</Text>
        <Text style={styles.subtitle}>
          Em breve você poderá acompanhar aqui seu progresso nas trilhas, certificados
          conquistados e habilidades em desenvolvimento.
        </Text>

        <View style={styles.section}>
          <InfoCard
            label="Nome do colaborador"
            value={user?.name ?? 'Colaborador SkillBoost (demo)'}
          />

          <InfoCard
            label="E-mail"
            value={user?.email ?? 'demo@skillboost.ai'}
          />

          <InfoCard
            label="Trilhas ativas"
            value="Em breve"
          />
        </View>

        <View style={styles.footer}>
          <AppButton
            label="Sair da conta"
            variant="outline"
            onPress={handleLogout}
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  title: {
    ...typography.titleL,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  section: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  footer: {
    marginTop: spacing.lg,
  },
});

export default ProfileScreen;
