// src/components/Card/InfoCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

type InfoCardProps = {
  
  title?: string;
  description?: string;
  
  label?: string;
  value?: string;
};

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  label,
  value,
}) => {
  
  const header = label ?? title ?? '';
  const body = value ?? description ?? '';

  return (
    <View style={styles.container}>
      {!!header && <Text style={styles.label}>{header}</Text>}
      {!!body && <Text style={styles.value}>{body}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  value: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
});

export default InfoCard;
