import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { Company } from '../../types/api';

interface CompanyCardProps {
  company: Company;
  onPress?: () => void;
}

const IMAGE_BASE_URL = 'https://dev.bhcjobs.com/uploads/company/';

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, onPress }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  
  const imageUrl = company.image ? `${IMAGE_BASE_URL}${company.image}` : null;
  const showImage = imageUrl && !imageError;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {showImage ? (
        <View style={styles.imageWrapper}>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.logoImage}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
          />
          {imageLoading && (
            <View style={styles.imageLoading}>
              <ActivityIndicator size="small" color={Colors.secondary} />
            </View>
          )}
        </View>
      ) : (
        <View style={styles.logoContainer}>
          <Ionicons name="business-outline" size={28} color={Colors.white} />
        </View>
      )}
      <Text style={styles.name} numberOfLines={2}>
        {company.name}
      </Text>
      {company.jobs_count !== undefined && company.jobs_count > 0 && (
        <Text style={styles.jobCount}>
          {company.jobs_count} jobs
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.lg,
    alignItems: 'center',
    width: 120,
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  logoImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: Spacing.sm,
  },
  imageWrapper: {
    marginBottom: Spacing.sm,
  },
  imageLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...Typography.bodySmall,
    color: Colors.text,
    textAlign: 'center',
    fontWeight: '600',
  },
  jobCount: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
});
