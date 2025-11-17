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
  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper
      style={({ pressed }: { pressed: boolean }) => [
        styles.card,
        pressed && onPress ? styles.cardPressed : null,
      ]}
      {...(onPress ? { onPress } : {})}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.level}>Nível: {level}</Text>
      <Text style={styles.hint}>Toque para ver detalhes</Text>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  cardPressed: {
    backgroundColor: '#131833',
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
