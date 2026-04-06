import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { useTheme } from '../../theme/ThemeContext';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}) => {
  const { colors } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    switch (variant) {
      case 'secondary':
        return { backgroundColor: colors.secondary };
      case 'outline':
        return { 
          backgroundColor: colors.transparent, 
          borderWidth: 2, 
          borderColor: colors.primary 
        };
      default:
        return { backgroundColor: colors.primary };
    }
  };

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case 'outline':
        return { color: colors.primary };
      default:
        return { color: colors.white };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && { backgroundColor: colors.textMuted, borderColor: colors.textMuted },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.white} />
      ) : (
        <Text style={[getTextStyle(), disabled && { color: colors.white }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
});