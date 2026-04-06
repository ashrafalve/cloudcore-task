import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { Industry } from '../../types/api';

interface IndustryCardProps {
  industry: Industry;
  onPress?: () => void;
}

const IMAGE_BASE_URL = 'https://dev.bhcjobs.com/storage/industry-image';

export const IndustryCard: React.FC<IndustryCardProps> = ({ industry, onPress }) => {
  const [imageError, setImageError] = useState(false);
  
  const imageUrl = industry.image ? `${IMAGE_BASE_URL}/${industry.image}` : null;
  const showImage = imageUrl && !imageError;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {showImage ? (
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.iconImage}
          onError={() => setImageError(true)}
        />
      ) : (
        <Text style={styles.iconText}>
          {industry.name.charAt(0).toUpperCase()}
        </Text>
      )}
      <Text style={styles.name} numberOfLines={2}>
        {industry.name}
      </Text>
      {industry.jobs_count !== undefined && industry.jobs_count > 0 && (
        <Text style={styles.jobCount}>
          {industry.jobs_count} jobs
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
    width: 110,
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginBottom: Spacing.sm,
  },
  iconText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.sm,
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
  },
});
