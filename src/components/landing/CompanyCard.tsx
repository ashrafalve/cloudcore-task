import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { useTheme } from '../../theme/ThemeContext';
import { Company } from '../../types/api';

interface CompanyCardProps {
  company: Company;
  onPress?: () => void;
}

const IMAGE_BASE_URL = 'https://dev.bhcjobs.com/storage/company-image';

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, onPress }) => {
  const { colors } = useTheme();
  const [imageError, setImageError] = useState(false);
  
  const imageUrl = company.image ? `${IMAGE_BASE_URL}/${company.image}` : null;
  const showImage = imageUrl && !imageError;

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <View style={styles.logoContainer}>
        {showImage ? (
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.logoImage}
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={[styles.logoPlaceholder, { backgroundColor: colors.secondary }]}>
            <Ionicons name="business-outline" size={28} color={colors.white} />
          </View>
        )}
      </View>
      <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
        {company.name}
      </Text>
      {company.jobs_count !== undefined && company.jobs_count > 0 && (
        <Text style={[styles.jobCount, { color: colors.textMuted }]}>
          {company.jobs_count} open positions
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: Spacing.lg,
    alignItems: 'center',
    width: 130,
    marginRight: Spacing.md,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  logoContainer: {
    marginBottom: Spacing.sm,
  },
  logoImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...Typography.bodySmall,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  jobCount: {
    ...Typography.caption,
    textAlign: 'center',
  },
});