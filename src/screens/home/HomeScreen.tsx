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
      <Text style={styles.title}>Olá, colaborador!</Text>
      <Text style={styles.subtitle}>
        Acompanhe suas trilhas de aprendizado e prepare-se para o futuro do
        trabalho.
      </Text>

      <InfoCard
        title="Minha evolução"
        description="Em breve você verá aqui o seu progresso nas trilhas de upskilling e reskilling."
      />

      <AppButton
        label="Ver trilhas recomendadas"
        onPress={handleGoToTracks}
        fullWidth={false}
      />

      <AppButton
        label="Ver meu perfil"
        onPress={handleGoToProfile}
        variant="outline"
        fullWidth={false}
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
  },
  title: {
    ...typography.titleXL,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  secondaryButton: {
    marginTop: spacing.sm,
  },
});

export default HomeScreen;
