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
        Acompanhe aqui suas trilhas, progresso, certificações e competências em
        desenvolvimento ao longo da sua jornada com a SkillBoost AI.
      </Text>

      <InfoCard
        title="Nome do colaborador"
        description="Colaborador SkillBoost (demo)"
      />

      <InfoCard
        title="Trilhas ativas"
        description="Em breve você verá aqui as trilhas em andamento, com progresso e status de conclusão."
      />

      <InfoCard
        title="Foco atual"
        description="Desenvolver competências digitais, inovação e uso estratégico de IA no seu dia a dia."
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
});

export default ProfileScreen;
