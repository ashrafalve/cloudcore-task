import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { useTheme } from '../../theme/ThemeContext';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'large';
  fullScreen?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  size = 'large',
  fullScreen = false,
}) => {
  const { colors } = useTheme();

  if (fullScreen) {
    return (
      <View style={[styles.fullScreenContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size={size} color={colors.primary} />
        {message && <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>}
    </View>
  );
};

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Something went wrong',
  onRetry,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="warning-outline" size={48} color={colors.error} />
      </View>
      <Text style={[styles.errorMessage, { color: colors.textSecondary }]}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={[styles.retryButton, { backgroundColor: colors.primary }]} onPress={onRetry}>
          <Ionicons name="refresh-outline" size={18} color={colors.white} />
          <Text style={[styles.retryText, { color: colors.white }]}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No data available',
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="mail-outline" size={48} color={colors.textMuted} />
      </View>
      <Text style={[styles.emptyMessage, { color: colors.textMuted }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    ...Typography.body,
    marginTop: Spacing.md,
  },
  iconContainer: {
    marginBottom: Spacing.md,
  },
  errorMessage: {
    ...Typography.body,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  retryButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  retryText: {
    ...Typography.buttonSmall,
    marginLeft: Spacing.xs,
  },
  emptyMessage: {
    ...Typography.body,
    textAlign: 'center',
  },
});