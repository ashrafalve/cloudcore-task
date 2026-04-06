import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface HeroBannerProps {
  onExploreJobs?: () => void;
  onLogin?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreJobs, onLogin }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Find Your Dream Job</Text>
        <Text style={styles.subtitle}>
          Discover thousands of job opportunities from top companies. Your next career move starts here.
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryButton} onPress={onExploreJobs}>
            <Text style={styles.primaryButtonText}>Explore Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={onLogin}>
            <Text style={styles.secondaryButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxxl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    ...Typography.h1,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    width: '100%',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
    flex: 1,
    maxWidth: 160,
  },
  primaryButtonText: {
    ...Typography.button,
    color: Colors.primary,
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: Colors.transparent,
    borderWidth: 2,
    borderColor: Colors.white,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
    flex: 1,
    maxWidth: 160,
  },
  secondaryButtonText: {
    ...Typography.button,
    color: Colors.white,
    textAlign: 'center',
  },
});