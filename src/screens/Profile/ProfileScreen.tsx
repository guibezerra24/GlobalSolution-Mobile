// src/screens/Profile/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';
import InfoCard from '../../components/Card/InfoCard';
import AppButton from '../../components/Button/AppButton';
import { useAuth } from '../../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = () => {
  const { user, signOut } = useAuth();

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
            void signOut();
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu perfil</Text>
      <Text style={styles.subtitle}>
        Acompanhe aqui suas trilhas, progresso, certificações e competências em
        desenvolvimento ao longo da sua jornada com a SkillBoost AI.
      </Text>

      <InfoCard
        title="Nome do colaborador"
        description={user?.name ?? 'Colaborador SkillBoost (demo)'}
      />

      <InfoCard
        title="E-mail"
        description={user?.email ?? 'Não disponível'}
      />

      <InfoCard
        title="Foco atual"
        description="Desenvolver competências digitais, inovação e uso estratégico de IA no seu dia a dia."
      />

      <View style={styles.logoutSection}>
        <AppButton
          label="Sair da conta"
          onPress={handleLogout}
          variant="outline"
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    ...typography.titleL,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  logoutSection: {
    marginTop: spacing.lg,
  },
});

export default ProfileScreen;
