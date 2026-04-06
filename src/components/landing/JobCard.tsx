import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { Job } from '../../types/api';

interface JobCardProps {
  job: Job;
  onPress?: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onPress }) => {
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
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.companyLogo}>
          {job.company?.image ? (
            <Image 
              source={{ uri: `https://dev.bhcjobs.com/storage/company-image/${job.company.image}` }} 
              style={styles.logoImage}
              onError={() => setLogoError(true)}
            />
          ) : (
            <Text style={styles.companyLogoText}>
              {job.company_name?.charAt(0).toUpperCase() || 'C'}
            </Text>
          )}
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.title} numberOfLines={2}>
            {job.job_title || 'Job Title'}
          </Text>
          <View style={styles.companyRow}>
            <Ionicons name="business-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.company} numberOfLines={1}>
              {job.company_name || 'Company Name'}
            </Text>
          </View>
        </View>
      </View>

      {salaryText && (
        <View style={styles.salaryContainer}>
          <View style={styles.salaryBadge}>
            <Ionicons name="cash-outline" size={14} color={Colors.primary} />
            <Text style={styles.salaryText}>{salaryText}</Text>
          </View>
        </View>
      )}
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{countryName}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="briefcase-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{jobType === 'overseas' ? 'OVERSEAS' : jobType}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="people-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{job.vacancy} vacancy</Text>
        </View>
      </View>

      <View style={styles.footer}>
        {expiryDate ? (
          <View style={styles.expiryContainer}>
            <Ionicons name="time-outline" size={12} color={Colors.warning} />
            <Text style={styles.expiryText}>Deadline: {expiryDate}</Text>
          </View>
        ) : (
          <View />
        )}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
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
    backgroundColor: Colors.primary,
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
    color: Colors.white,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...Typography.h4,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  company: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  salaryContainer: {
    marginBottom: Spacing.sm,
  },
  salaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight + '15',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  salaryText: {
    ...Typography.bodySmall,
    color: Colors.primary,
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
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.md,
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiryText: {
    ...Typography.caption,
    color: Colors.warning,
    marginLeft: Spacing.xs,
    fontWeight: '500',
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
    borderColor: Colors.primary,
  },
  viewButtonText: {
    ...Typography.buttonSmall,
    color: Colors.primary,
  },
  applyButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
  },
  applyButtonText: {
    ...Typography.buttonSmall,
    color: Colors.white,
  },
});
