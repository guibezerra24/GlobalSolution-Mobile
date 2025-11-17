// src/components/Button/AppButton.tsx
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { colors, spacing, typography } from '../../theme';

type AppButtonVariant = 'primary' | 'outline';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: AppButtonVariant;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

const AppButton: React.FC<AppButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  fullWidth = false,
  style,
}) => {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.base,
        isPrimary ? styles.primary : styles.outline,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          isPrimary ? styles.labelPrimary : styles.labelOutline,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  label: {
    ...typography.body,
    fontWeight: '600',
  },
  labelPrimary: {
    color: colors.textPrimary,
  },
  labelOutline: {
    color: colors.primary,
  },
});

export default AppButton;
