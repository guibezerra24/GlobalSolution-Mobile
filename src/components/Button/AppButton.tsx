// src/components/Button/AppButton.tsx
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { colors, spacing, typography } from '../../theme';

type ButtonVariant = 'primary' | 'outline';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
} & Omit<PressableProps, 'style' | 'onPress'>;

const AppButton: React.FC<AppButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  fullWidth,
  loading = false,
  disabled = false,
  style,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const baseStyle = [
    styles.button,
    variant === 'outline' ? styles.buttonOutline : styles.buttonPrimary,
    fullWidth && styles.fullWidth,
    isDisabled && styles.buttonDisabled,
    style,
  ];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      onPress={isDisabled ? undefined : onPress}
      style={({ pressed }) => [
        ...baseStyle,
        pressed && !isDisabled ? styles.buttonPressed : undefined,
      ]}
      {...rest}
    >
      <View style={styles.content}>
        {loading && (
          <ActivityIndicator
            size="small"
            color={variant === 'outline' ? colors.primary : '#FFFFFF'}
            style={styles.spinner}
          />
        )}
        <Text
          style={[
            styles.label,
            variant === 'outline' ? styles.labelOutline : styles.labelPrimary,
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginRight: spacing.xs,
  },
  label: {
    ...typography.body, 
    fontWeight: '600',
    textAlign: 'center',
  },
  labelPrimary: {
    color: '#FFFFFF', 
  },
  labelOutline: {
    color: colors.primary,
  },
});

export default AppButton;
