import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface HeroBannerProps extends TouchableOpacityProps {
  onExploreJobs?: () => void;
  onLogin?: () => void;
  isDark?: boolean;
  onThemeToggle?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ 
  onExploreJobs, 
  onLogin, 
  isDark = false,
  onThemeToggle,
  ...props 
}) => {
  return (
    <LinearGradient
      colors={['#2563EB', '#1D4ED8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
      {...props}
    >
      <View style={styles.topRow}>
        <View style={styles.logoContainer}>
          <Ionicons name="briefcase" size={24} color="#FFFFFF" />
          <Text style={styles.logoText}>BHC Jobs</Text>
        </View>
        {onThemeToggle && (
          <TouchableOpacity 
            style={styles.themeToggle} 
            onPress={onThemeToggle}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={isDark ? 'sunny' : 'moon'} 
              size={18} 
              color="#FFFFFF" 
            />
            <Text style={styles.themeText}>
              {isDark ? 'Light' : 'Dark'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>#1 Platform for Saudi Jobs</Text>
        <Text style={styles.subtitle}>
          Apply for jobs in Saudi Arabia with verified employers. We connect Bangladeshi workforce with high-demand Saudi Jobs.
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryButton} onPress={onExploreJobs} activeOpacity={0.8}>
            <Ionicons name="search" size={18} color="#2563EB" />
            <Text style={styles.primaryButtonText}>Explore Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={onLogin} activeOpacity={0.8}>
            <Ionicons name="log-in" size={18} color="#FFFFFF" />
            <Text style={styles.secondaryButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 48,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  themeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 24,
    paddingHorizontal: 16,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    flex: 1,
    maxWidth: 170,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2563EB',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    flex: 1,
    maxWidth: 170,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});