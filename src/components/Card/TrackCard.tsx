// src/components/Card/TrackCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, spacing, typography } from '../../theme';

type TrackCardProps = {
  title: string;
  level: string;
  onPress?: () => void;
};

const TrackCard: React.FC<TrackCardProps> = ({ title, level, onPress }) => {
  if (!onPress) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.level}>Nível: {level}</Text>
        <Text style={styles.hint}>Trilha disponível</Text>
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed ? styles.cardPressed : undefined,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.level}>Nível: {level}</Text>
      <Text style={styles.hint}>Toque para ver detalhes</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardPressed: {
    backgroundColor: '#111632',
  },
  title: {
    ...typography.titleM,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  level: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  hint: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

export default TrackCard;
