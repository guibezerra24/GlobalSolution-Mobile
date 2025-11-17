// src/screens/TrackDetail/TrackDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';
import InfoCard from '../../components/Card/InfoCard';
import AppButton from '../../components/Button/AppButton';
import { tracksService } from '../../services/tracksService';
import { Track } from '../../types/Track';

type Props = NativeStackScreenProps<RootStackParamList, 'TrackDetail'>;

const TrackDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { trackId } = route.params;

  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(false);

  const loadTrack = async () => {
    try {
      setLoading(true);
      const data = await tracksService.getById(trackId);
      setTrack(data);
    } catch (err) {
      console.error(err);
      Alert.alert(
        'Erro',
        'Não foi possível carregar os dados da trilha. Tente novamente.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTrack();
  }, [trackId]);

  const handleEdit = () => {
    navigation.navigate('TrackForm', { trackId });
  };

  const handleRemove = () => {
    Alert.alert(
      'Remover trilha',
      'Tem certeza que deseja remover esta trilha? Essa ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              setRemoving(true);
              await tracksService.remove(trackId);
              Alert.alert('Sucesso', 'Trilha removida com sucesso.', [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('Tracks'),
                },
              ]);
            } catch (err) {
              console.error(err);
              Alert.alert(
                'Erro',
                'Não foi possível remover a trilha. Tente novamente.',
              );
            } finally {
              setRemoving(false);
            }
          },
        },
      ],
    );
  };

  const handleEnroll = async () => {
    if (!track) return;

    try {
      const newStatus =
        track.enrollmentStatus === 'enrolled' ? 'not_enrolled' : 'enrolled';

      const updated = await tracksService.update(track.id, {
        enrollmentStatus: newStatus,
      });

      setTrack(updated);

      Alert.alert(
        'Sucesso',
        newStatus === 'enrolled'
          ? 'Você foi inscrito nesta trilha! Continue avançando para aumentar seu nível de empregabilidade.'
          : 'Inscrição cancelada. Você pode se inscrever novamente quando quiser.',
      );
    } catch (err) {
      console.error(err);
      Alert.alert(
        'Erro',
        'Não foi possível atualizar o status de inscrição. Tente novamente.',
      );
    }
  };

  if (loading || !track) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando trilha...</Text>
      </View>
    );
  }

  const skills = track.skills?.join(', ') || 'Não informado';
  const statusLabel =
    track.enrollmentStatus === 'enrolled'
      ? 'Inscrito'
      : track.enrollmentStatus === 'completed'
      ? 'Concluída'
      : 'Não inscrito';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{track.title}</Text>

      <Text style={styles.contextText}>
        Esta trilha faz parte da SkillBoost AI e foi pensada para desenvolver
        habilidades essenciais para o futuro do trabalho na sua organização.
      </Text>

      <Text style={styles.subtitle}>{track.description}</Text>

      <InfoCard
        title="Nível da trilha"
        description={String(track.level || 'Não informado')}
      />

      <InfoCard
        title="Carga horária estimada"
        description={`${track.workloadHours ?? 0} horas totais`}
      />

      <InfoCard
        title="Habilidades trabalhadas"
        description={skills}
      />

      <InfoCard
        title="Status de inscrição"
        description={`${statusLabel} • Progresso: ${track.progress ?? 0}%`}
      />

      <View style={styles.actionsRow}>
        <AppButton
          label={
            track.enrollmentStatus === 'enrolled'
              ? 'Cancelar inscrição'
              : 'Inscrever-se nesta trilha'
          }
          onPress={handleEnroll}
          fullWidth
        />
      </View>

      <View style={styles.actionsRow}>
        <AppButton
          label="Editar trilha"
          onPress={handleEdit}
          variant="outline"
          fullWidth
        />
      </View>

      <View style={styles.actionsRow}>
        <AppButton
          label={removing ? 'Removendo...' : 'Remover trilha'}
          onPress={handleRemove}
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
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  title: {
    ...typography.titleL,
    color: colors.textPrimary,
  },
  contextText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  actionsRow: {
    marginTop: spacing.xs,
  },
});

export default TrackDetailScreen;
