// src/screens/Tracks/TracksScreen.tsx
import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';
import TrackCard from '../../components/Card/TrackCard';
import AppButton from '../../components/Button/AppButton';
import { tracksService } from '../../services/tracksService';
import { useFetch } from '../../hooks/useFetch';
import { Track } from '../../types/Track';
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Tracks'>;

const TracksScreen: React.FC<Props> = ({ navigation }) => {
  const {
    data,
    loading,
    error,
    refetch,
  } = useFetch<Track[]>(() => tracksService.list(), []);

  // refetch sempre que voltar para essa tela
  useFocusEffect(
    useCallback(() => {
      void refetch();
    }, [refetch]),
  );

  const handleOpenTrack = (trackId: string) => {
    navigation.navigate('TrackDetail', { trackId });
  };

  const handleCreateTrack = () => {
    navigation.navigate('TrackForm', {});
  };

  const handleRetry = () => {
    void refetch();
  };

  const handleEmptyInfo = () => {
    Alert.alert(
      'Sem trilhas cadastradas',
      'Você ainda não possui trilhas criadas. Clique em "Criar nova trilha" para cadastrar a primeira trilha da SkillBoost AI.',
    );
  };

  const tracks = data ?? [];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Trilhas recomendadas</Text>
        <AppButton
          label="+ Nova"
          onPress={handleCreateTrack}
          variant="outline"
        />
      </View>

      <Text style={styles.subtitle}>
        Trilhas de upskilling e reskilling alinhadas às demandas do futuro do trabalho.
      </Text>

      {loading && !tracks.length ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.helperText}>Carregando trilhas...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{error}</Text>
          <AppButton label="Tentar novamente" onPress={handleRetry} />
        </View>
      ) : tracks.length === 0 ? (
        <View style={styles.centerContent}>
          <Text style={styles.helperText}>
            Nenhuma trilha cadastrada ainda.
          </Text>
          <AppButton label="Entendi" onPress={handleEmptyInfo} />
          <AppButton
            label="Criar primeira trilha"
            onPress={handleCreateTrack}
            style={styles.mtSm}
          />
        </View>
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refetch}
              tintColor={colors.primary}
            />
          }
          renderItem={({ item }) => (
            <TrackCard
              title={item.title}
              level={String(item.level)}
              onPress={() => handleOpenTrack(item.id)}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.titleL,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  listContent: {
    paddingVertical: spacing.sm,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  helperText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  errorText: {
    ...typography.body,
    color: colors.danger,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  mtSm: {
    marginTop: spacing.sm,
  },
});

export default TracksScreen;
