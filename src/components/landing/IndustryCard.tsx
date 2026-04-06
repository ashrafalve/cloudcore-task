import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { Industry } from '../../types/api';

interface IndustryCardProps {
  industry: Industry;
  onPress?: () => void;
}

const IMAGE_BASE_URL = 'https://dev.bhcjobs.com/uploads/industry/';

const INDUSTRY_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  'construction': 'construct-outline',
  'facilities management': 'business-outline',
  'fast food restaurant': 'fast-food-outline',
  'cafes & coffee shops': 'cafe-outline',
  'car wash': 'car-outline',
  'driving': 'car-outline',
  'security guard': 'shield-checkmark-outline',
  'house keeping': 'home-outline',
  'beauty salon': 'cut-outline',
  'laundry': 'shirt-outline',
  'restaurant': 'restaurant-outline',
  'hotel': 'bed-outline',
  'retail': 'cart-outline',
  'warehouse': 'cube-outline',
  'manufacturing': 'hardware-chip-outline',
  'it': 'laptop-outline',
  'software': 'code-slash-outline',
  'healthcare': 'medkit-outline',
  'medical': 'fitness-outline',
  'education': 'school-outline',
  'finance': 'cash-outline',
  'banking': 'card-outline',
  'real estate': 'home-outline',
  'travel': 'airplane-outline',
  'logistics': 'airplane-outline',
  'automotive': 'car-sport-outline',
  'food & beverage': 'pizza-outline',
  'cleaning': 'sparkles-outline',
  'maintenance': 'build-outline',
  'electrical': 'flash-outline',
  'plumbing': 'water-outline',
  'painting': 'color-palette-outline',
  'carpentry': 'hammer-outline',
  'default': 'briefcase-outline',
};

const getIndustryIcon = (name: string): keyof typeof Ionicons.glyphMap => {
  const key = name.toLowerCase().trim();
  for (const [keyword, icon] of Object.entries(INDUSTRY_ICONS)) {
    if (key.includes(keyword)) {
      return icon;
    }
  }
  return INDUSTRY_ICONS.default;
};

export const IndustryCard: React.FC<IndustryCardProps> = ({ industry, onPress }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  
  const imageUrl = industry.image ? `${IMAGE_BASE_URL}${industry.image}` : null;
  const showImage = imageUrl && !imageError;
  const iconName = getIndustryIcon(industry.name);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {showImage ? (
        <View style={styles.imageWrapper}>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.iconImage}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
          />
          {imageLoading && (
            <View style={styles.imageLoading}>
              <ActivityIndicator size="small" color={Colors.primary} />
            </View>
          )}
        </View>
      ) : (
        <View style={styles.iconContainer}>
          <Ionicons name={iconName} size={24} color={Colors.white} />
        </View>
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
    borderRadius: 12,
    padding: Spacing.lg,
    alignItems: 'center',
    width: 100,
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  iconImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
