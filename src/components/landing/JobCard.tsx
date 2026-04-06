import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { useTheme } from '../../theme/ThemeContext';
import { Job } from '../../types/api';

interface JobCardProps {
  job: Job;
  onPress?: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onPress }) => {
  const { colors } = useTheme();
  const [logoError, setLogoError] = useState(false);

  const salaryText = job.min_salary && job.max_salary 
    ? `${job.currency || 'SAR'} ${job.min_salary.toLocaleString()} - ${job.max_salary.toLocaleString()}`
    : job.min_salary 
      ? `${job.currency || 'SAR'} ${job.min_salary.toLocaleString()}+`
      : null;

  const countryName = job.country?.name || 'Overseas';
  const jobType = job.type || job.employment_type || 'full_time';
  const expiryDate = job.expiry ? new Date(job.expiry).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : null;

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={[styles.companyLogo, { backgroundColor: colors.primary }]}>
          {job.company?.image ? (
            <Image 
              source={{ uri: `https://dev.bhcjobs.com/storage/company-image/${job.company.image}` }} 
              style={styles.logoImage}
              onError={() => setLogoError(true)}
            />
          ) : (
            <Text style={[styles.companyLogoText, { color: colors.white }]}>
              {job.company_name?.charAt(0).toUpperCase() || 'C'}
            </Text>
          )}
        </View>
        <View style={styles.headerInfo}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {job.job_title || 'Job Title'}
          </Text>
          <View style={styles.companyRow}>
            <Ionicons name="business-outline" size={14} color={colors.textSecondary} />
            <Text style={[styles.company, { color: colors.textSecondary }]} numberOfLines={1}>
              {job.company_name || 'Company Name'}
            </Text>
          </View>
        </View>
      </View>

      {salaryText && (
        <View style={styles.salaryContainer}>
          <View style={[styles.salaryBadge, { backgroundColor: colors.primaryLight + '20' }]}>
            <Ionicons name="cash-outline" size={14} color={colors.primary} />
            <Text style={[styles.salaryText, { color: colors.primary }]}>{salaryText}</Text>
          </View>
        </View>
      )}
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>{countryName}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="briefcase-outline" size={14} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>{jobType === 'overseas' ? 'OVERSEAS' : jobType}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="people-outline" size={14} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>{job.vacancy} vacancy</Text>
        </View>
      </View>

      <View style={[styles.footer, { borderTopColor: colors.borderLight }]}>
        {expiryDate ? (
          <View style={styles.expiryContainer}>
            <Ionicons name="time-outline" size={12} color={colors.warning} />
            <Text style={[styles.expiryText, { color: colors.warning }]}>Deadline: {expiryDate}</Text>
          </View>
        ) : (
          <View />
        )}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.viewButton, { borderColor: colors.primary }]}>
            <Text style={[styles.viewButtonText, { color: colors.primary }]}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.applyButton, { backgroundColor: colors.primary }]}>
            <Text style={[styles.applyButtonText, { color: colors.white }]}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  companyLogo: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    overflow: 'hidden',
  },
  logoImage: {
    width: 52,
    height: 52,
  },
  companyLogoText: {
    ...Typography.h3,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...Typography.h4,
    marginBottom: Spacing.xs,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  company: {
    ...Typography.bodySmall,
    marginLeft: Spacing.xs,
  },
  salaryContainer: {
    marginBottom: Spacing.sm,
  },
  salaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  salaryText: {
    ...Typography.bodySmall,
    fontWeight: '700',
    marginLeft: Spacing.xs,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    ...Typography.caption,
    marginLeft: Spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: Spacing.md,
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiryText: {
    ...Typography.caption,
    fontWeight: '500',
    marginLeft: Spacing.xs,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  viewButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 8,
    borderWidth: 1,
  },
  viewButtonText: {
    ...Typography.buttonSmall,
  },
  applyButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
  },
  applyButtonText: {
    ...Typography.buttonSmall,
  },
});