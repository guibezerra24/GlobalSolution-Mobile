// src/screens/Home/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';
import AppButton from '../../components/Button/AppButton';
import InfoCard from '../../components/Card/InfoCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleGoToTracks = () => {
    navigation.navigate('Tracks');
  };

  const handleGoToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá! Pronto para evoluir hoje?</Text>

      <Text style={styles.subtitle}>
        Acompanhe suas trilhas de aprendizado, identifique os próximos passos e
        prepare-se para o futuro do trabalho com apoio da SkillBoost AI.
      </Text>

      <InfoCard
        title="Minha evolução"
        description="Em breve você verá aqui indicadores como trilhas em andamento, horas dedicadas e competências em destaque."
      />

      <InfoCard
        title="Sugestão do dia"
        description="Reserve alguns minutos para avançar em uma trilha estratégica para o seu papel atual ou para a carreira que você deseja atingir."
      />

      <AppButton
        label="Explorar trilhas"
        onPress={handleGoToTracks}
        fullWidth
      />

      <AppButton
        label="Meu perfil"
        onPress={handleGoToProfile}
        variant="outline"
        fullWidth
        style={styles.secondaryButton}
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
    ...typography.titleXL,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  secondaryButton: {
    marginTop: spacing.xs,
  },
});

export default HomeScreen;
