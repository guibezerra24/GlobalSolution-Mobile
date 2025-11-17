// src/screens/Tracks/TracksScreen.tsx
import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';
import TrackCard from '../../components/Card/TrackCard';
import AppButton from '../../components/Button/AppButton';
import { tracksService } from '../../services/tracksService';
import { useFetch } from '../../hooks/useFetch';
import { Track } from '../../types/Track';

type Props = NativeStackScreenProps<RootStackParamList, 'Tracks'>;

const TracksScreen: React.FC<Props> = ({ navigation }) => {
  const { data, loading, error, refetch } = useFetch<Track[]>(
    () => tracksService.list(),
    [],
  );

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

  const tracks = data ?? [];

  const renderContent = () => {
    if (loading && !tracks.length) {
      return (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.helperText}>Carregando trilhas...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{error}</Text>
          <AppButton label="Tentar novamente" onPress={refetch} />
        </View>
      );
    }

    if (tracks.length === 0) {
      return (
        <View style={styles.centerContent}>
          <Text style={styles.helperText}>
            Ainda não há trilhas cadastradas para este ambiente.
          </Text>
          <Text style={styles.helperTextSecondary}>
            Crie a primeira trilha da SkillBoost AI e comece a estruturar o
            plano de desenvolvimento dos colaboradores.
          </Text>
          <AppButton
            label="Criar primeira trilha"
            onPress={handleCreateTrack}
            style={styles.mtSm}
          />
        </View>
      );
    }

    return (
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
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
          Aqui você encontra trilhas criadas para reduzir gaps de habilidades,
          apoiar realocação interna e desenvolver competências estratégicas.
        </Text>

        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
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
    gap: spacing.sm,
  },
  helperText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  helperTextSecondary: {
    ...typography.caption,
    color: colors.textSecondary,
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
