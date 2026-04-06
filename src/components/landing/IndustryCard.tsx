import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Industry } from '../../types/api';

interface IndustryCardProps {
  industry: Industry;
  onPress?: () => void;
}

const IMAGE_BASE_URL = 'https://dev.bhcjobs.com/storage/industry-image';

export const IndustryCard: React.FC<IndustryCardProps> = ({ industry, onPress }) => {
  const { colors } = useTheme();
  const [imageError, setImageError] = useState(false);
  
  const imageUrl = industry.image ? `${IMAGE_BASE_URL}/${industry.image}` : null;
  const showImage = imageUrl && !imageError;

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      {showImage ? (
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.iconImage}
          onError={() => setImageError(true)}
        />
      ) : (
        <Text style={[styles.iconText, { color: colors.primary }]}>
          {industry.name.charAt(0).toUpperCase()}
        </Text>
      )}
      <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
        {industry.name}
      </Text>
      {industry.jobs_count !== undefined && industry.jobs_count > 0 && (
        <Text style={[styles.jobCount, { color: colors.textMuted }]}>
          {industry.jobs_count} jobs
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: 110,
    marginRight: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginBottom: 8,
  },
  iconText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  name: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 4,
  },
  jobCount: {
    fontSize: 11,
  },
});