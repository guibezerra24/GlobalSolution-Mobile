// src/screens/TrackDetail/TrackDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';
import InfoCard from '../../components/Card/InfoCard';

type Props = NativeStackScreenProps<RootStackParamList, 'TrackDetail'>;

const TrackDetailScreen: React.FC<Props> = ({ route }) => {
  const { trackId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhe da trilha</Text>
      <Text style={styles.subtitle}>
        Aqui teremos as informações completas da trilha selecionada, como carga
        horária, competências desenvolvidas e plano de estudos.
      </Text>

      <InfoCard
        title="ID da trilha selecionada"
        description={trackId}
      />

      <Text style={styles.placeholder}>
        Na próxima etapa vamos conectar esta tela à API (MockAPI) para carregar
        os dados reais da trilha e permitir a inscrição do colaborador.
      </Text>
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
  placeholder: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});

export default TrackDetailScreen;
