// src/screens/Tracks/TracksScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';
import TrackCard from '../../components/Card/TrackCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Tracks'>;

type SimpleTrack = {
  id: string;
  title: string;
  level: string;
};

const MOCK_TRACKS: SimpleTrack[] = [
  { id: '1', title: 'Fundamentos de IA e Automação', level: 'Intermediário' },
  { id: '2', title: 'Dados e Analytics para Negócios', level: 'Intermediário' },
  { id: '3', title: 'Liderança Digital e Colaboração', level: 'Avançado' },
];

const TracksScreen: React.FC<Props> = ({ navigation }) => {
  const handleOpenTrack = (trackId: string) => {
    navigation.navigate('TrackDetail', { trackId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trilhas recomendadas</Text>
      <Text style={styles.subtitle}>
        Estas trilhas representam caminhos de upskilling e reskilling alinhados
        às demandas do futuro do trabalho.
      </Text>

      <FlatList
        data={MOCK_TRACKS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TrackCard
            title={item.title}
            level={item.level}
            onPress={() => handleOpenTrack(item.id)}
          />
        )}
      />
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
  listContent: {
    paddingVertical: spacing.sm,
  },
});

export default TracksScreen;
