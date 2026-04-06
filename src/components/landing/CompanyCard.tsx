import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { Company } from '../../types/api';

interface CompanyCardProps {
  company: Company;
  onPress?: () => void;
}

const IMAGE_BASE_URL = 'https://dev.bhcjobs.com/storage/company-image';

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, onPress }) => {
  const [imageError, setImageError] = useState(false);
  
  const imageUrl = company.image ? `${IMAGE_BASE_URL}/${company.image}` : null;
  const showImage = imageUrl && !imageError;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.logoContainer}>
        {showImage ? (
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.logoImage}
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={styles.logoPlaceholder}>
            <Ionicons name="business-outline" size={28} color={Colors.white} />
          </View>
        )}
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {company.name}
      </Text>
      {company.jobs_count !== undefined && company.jobs_count > 0 && (
        <Text style={styles.jobCount}>
          {company.jobs_count} open positions
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.lg,
    alignItems: 'center',
    width: 130,
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
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
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...Typography.bodySmall,
    color: Colors.text,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  jobCount: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
