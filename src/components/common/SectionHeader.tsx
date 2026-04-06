import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onSeeAll }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity style={styles.seeAllButton} onPress={onSeeAll}>
          <Text style={[styles.seeAll, { color: colors.primary }]}>View All</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
});