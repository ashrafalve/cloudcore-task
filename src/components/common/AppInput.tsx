import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { useTheme } from '../../theme/ThemeContext';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
      <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: error ? colors.error : colors.border }]}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            { color: colors.text },
            leftIcon ? styles.inputWithLeftIcon : null,
            rightIcon ? styles.inputWithRightIcon : null,
            style,
          ].filter(Boolean)}
          placeholderTextColor={colors.textMuted}
          {...props}
        />
        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>
      {error && <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  label: {
    ...Typography.bodySmall,
    marginBottom: Spacing.sm,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 56,
  },
  input: {
    flex: 1,
    ...Typography.body,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  inputWithLeftIcon: {
    paddingLeft: Spacing.xs,
  },
  inputWithRightIcon: {
    paddingRight: Spacing.xs,
  },
  iconLeft: {
    paddingLeft: Spacing.lg,
  },
  iconRight: {
    paddingRight: Spacing.lg,
  },
  errorText: {
    ...Typography.caption,
    marginTop: Spacing.xs,
  },
});