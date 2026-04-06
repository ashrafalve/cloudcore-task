import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface HeroBannerProps {
  onExploreJobs?: () => void;
  onLogin?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreJobs, onLogin }) => {
  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="briefcase" size={48} color={Colors.white} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>#1 Platform for Saudi Jobs</Text>
        <Text style={styles.subtitle}>
          Apply for jobs in Saudi Arabia with verified employers. We connect Bangladeshi workforce with high-demand Saudi Jobs.
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryButton} onPress={onExploreJobs} activeOpacity={0.8}>
            <Ionicons name="search" size={18} color={Colors.primary} />
            <Text style={styles.primaryButtonText}>Explore Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={onLogin} activeOpacity={0.8}>
            <Ionicons name="log-in" size={18} color={Colors.white} />
            <Text style={styles.secondaryButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxxl,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    ...Typography.h1,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    flex: 1,
    maxWidth: 170,
  },
  primaryButtonText: {
    ...Typography.button,
    color: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.white,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    flex: 1,
    maxWidth: 170,
  },
  secondaryButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
});
