// src/screens/Profile/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';
import InfoCard from '../../components/Card/InfoCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu perfil</Text>
      <Text style={styles.subtitle}>
        Acompanhe aqui seu progresso nas trilhas, certificados conquistados e
        habilidades em desenvolvimento.
      </Text>

      <InfoCard
        title="Nome do colaborador"
        description="Colaborador SkillBoost (demo)"
      />

      <InfoCard
        title="Trilhas ativas"
        description="Em breve você verá aqui as trilhas em andamento."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  title: {
    ...typography.titleL,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
});

export default ProfileScreen;
