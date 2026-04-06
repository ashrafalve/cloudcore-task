import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
  const salaryText = job.min_salary && job.max_salary 
    ? `${job.currency || 'SAR'} ${job.min_salary} - ${job.max_salary}`
    : job.min_salary 
      ? `${job.currency || 'SAR'} ${job.min_salary}+`
      : null;

  const countryName = job.country?.name || 'Overseas';
  const jobType = job.type || job.employment_type || 'full_time';
  const expiryDate = job.expiry ? new Date(job.expiry).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.companyLogo}>
          <Text style={styles.companyLogoText}>
            {job.company_name?.charAt(0).toUpperCase() || 'C'}
          </Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.title} numberOfLines={2}>
            {job.job_title || 'Job Title'}
          </Text>
          <Text style={styles.company} numberOfLines={1}>
            {job.company_name || 'Company Name'}
          </Text>
        </View>
      </View>

      {salaryText && (
        <View style={styles.salaryContainer}>
          <Ionicons name="cash-outline" size={16} color={Colors.primary} />
          <Text style={styles.salaryText}>{salaryText}</Text>
        </View>
      )}
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Ionicons name="globe-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{countryName}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="business-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{job.industry_name || 'N/A'}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="person-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{job.gender || 'Any'}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="briefcase-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{jobType === 'overseas' ? 'OVERSEAS' : jobType}</Text>
        </View>
        {job.experience && (
          <View style={styles.detailItem}>
            <Ionicons name="school-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.detailText}>Exp: {job.experience}</Text>
          </View>
        )}
      </View>

      {expiryDate && (
        <View style={styles.expiryContainer}>
          <Ionicons name="time-outline" size={12} color={Colors.warning} />
          <Text style={styles.expiryText}>Application Deadline: {expiryDate}</Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.vacancyText}>
          {job.vacancy ? `${job.vacancy} vacancy(s)` : 'Open'}
        </Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply Now</Text>
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
  },
  header: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  companyLogoText: {
    ...Typography.h4,
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
  company: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight + '20',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  salaryText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '600',
    marginLeft: Spacing.xs,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
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
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  expiryText: {
    ...Typography.caption,
    color: Colors.warning,
    marginLeft: Spacing.xs,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.md,
  },
  vacancyText: {
    ...Typography.caption,
    color: Colors.textMuted,
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
