import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { LoadingState } from '../components/common/LoadingState';
import { AppButton } from '../components/common/AppButton';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { Job } from '../types/api';
import { getJobById } from '../services/jobService';

export const JobDetailScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      setLoading(true);
      const jobData = await getJobById(Number(id));
      setJob(jobData);
      setLoading(false);
    };
    fetchJob();
  }, [id]);

  const salaryText = job?.min_salary && job?.max_salary 
    ? `${job.currency || 'SAR'} ${job.min_salary} - ${job.max_salary}`
    : job?.min_salary 
      ? `${job.currency || 'SAR'} ${job.min_salary}+`
      : null;

  const countryName = job?.country?.name || 'Overseas';
  const expiryDate = job?.expiry ? new Date(job.expiry).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null;

  if (loading) {
    return (
      <ScreenContainer>
        <LoadingState fullScreen message="Loading job details..." />
      </ScreenContainer>
    );
  }

  if (!job) {
    return (
      <ScreenContainer>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Job not found</Text>
          <AppButton title="Go Back" onPress={() => router.back()} />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer padded={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>
              {job.company_name?.charAt(0).toUpperCase() || 'C'}
            </Text>
          </View>
          <Text style={styles.jobTitle}>{job.job_title}</Text>
          <Text style={styles.companyName}>{job.company_name}</Text>
          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Ionicons name="globe-outline" size={14} color={Colors.white} />
              <Text style={styles.tagText}>{countryName}</Text>
            </View>
            {job.type === 'overseas' && (
              <View style={[styles.tag, styles.overseasTag]}>
                <Text style={styles.tagText}>OVERSEAS</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.content}>
          {salaryText && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Salary</Text>
              <View style={styles.salaryContainer}>
                <Ionicons name="cash-outline" size={24} color={Colors.primary} />
                <Text style={styles.salaryText}>{salaryText}</Text>
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Job Details</Text>
            <View style={styles.detailRow}>
              <Ionicons name="business-outline" size={20} color={Colors.textSecondary} />
              <Text style={styles.detailLabel}>Industry:</Text>
              <Text style={styles.detailValue}>{job.industry_name || 'N/A'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="briefcase-outline" size={20} color={Colors.textSecondary} />
              <Text style={styles.detailLabel}>Job Type:</Text>
              <Text style={styles.detailValue}>{job.employment_type || 'Full Time'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="person-outline" size={20} color={Colors.textSecondary} />
              <Text style={styles.detailLabel}>Gender:</Text>
              <Text style={styles.detailValue}>{job.gender || 'Any'}</Text>
            </View>
            {job.experience && (
              <View style={styles.detailRow}>
                <Ionicons name="school-outline" size={20} color={Colors.textSecondary} />
                <Text style={styles.detailLabel}>Experience:</Text>
                <Text style={styles.detailValue}>{job.experience} years</Text>
              </View>
            )}
            <View style={styles.detailRow}>
              <Ionicons name="people-outline" size={20} color={Colors.textSecondary} />
              <Text style={styles.detailLabel}>Vacancy:</Text>
              <Text style={styles.detailValue}>{job.vacancy} positions</Text>
            </View>
            {job.min_age && job.max_age && (
              <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={20} color={Colors.textSecondary} />
                <Text style={styles.detailLabel}>Age:</Text>
                <Text style={styles.detailValue}>{job.min_age} - {job.max_age} years</Text>
              </View>
            )}
          </View>

          {job.job_desc && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Job Description</Text>
              <Text style={styles.descriptionText}>{job.job_desc.replace(/<[^>]*>/g, '')}</Text>
            </View>
          )}

          {job.job_requirement && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Requirements</Text>
              <Text style={styles.descriptionText}>{job.job_requirement.replace(/<[^>]*>/g, '')}</Text>
            </View>
          )}

          {job.benefits && job.benefits.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Benefits</Text>
              {job.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle-outline" size={20} color={Colors.success} />
                  <Text style={styles.benefitText}>{benefit.name}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Other Details</Text>
            {job.accommodation && (
              <View style={styles.detailRow}>
                <Ionicons name="home-outline" size={20} color={Colors.textSecondary} />
                <Text style={styles.detailLabel}>Accommodation:</Text>
                <Text style={styles.detailValue}>{job.accommodation}</Text>
              </View>
            )}
            {job.transportation && (
              <View style={styles.detailRow}>
                <Ionicons name="car-outline" size={20} color={Colors.textSecondary} />
                <Text style={styles.detailLabel}>Transportation:</Text>
                <Text style={styles.detailValue}>{job.transportation}</Text>
              </View>
            )}
            {job.food_option && (
              <View style={styles.detailRow}>
                <Ionicons name="restaurant-outline" size={20} color={Colors.textSecondary} />
                <Text style={styles.detailLabel}>Food:</Text>
                <Text style={styles.detailValue}>{job.food_option}</Text>
              </View>
            )}
            {job.iqama && (
              <View style={styles.detailRow}>
                <Ionicons name="card-outline" size={20} color={Colors.textSecondary} />
                <Text style={styles.detailLabel}>Iqama:</Text>
                <Text style={styles.detailValue}>{job.iqama}</Text>
              </View>
            )}
          </View>

          {expiryDate && (
            <View style={styles.expiryBanner}>
              <Ionicons name="time-outline" size={20} color={Colors.warning} />
              <Text style={styles.expiryText}>Application Deadline: {expiryDate}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton title="Apply Now" onPress={() => console.log('Apply pressed', job.id)} />
      </View>
    </ScreenContainer>
  );
};

export default JobDetailScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    padding: Spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  logoText: {
    ...Typography.h1,
    color: Colors.primary,
  },
  jobTitle: {
    ...Typography.h2,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  companyName: {
    ...Typography.body,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: Spacing.md,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white + '30',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: 20,
  },
  overseasTag: {
    backgroundColor: Colors.secondary,
  },
  tagText: {
    ...Typography.caption,
    color: Colors.white,
    marginLeft: Spacing.xs,
  },
  content: {
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight + '20',
    padding: Spacing.md,
    borderRadius: 12,
  },
  salaryText: {
    ...Typography.h3,
    color: Colors.primary,
    marginLeft: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  detailLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginLeft: Spacing.sm,
    width: 100,
  },
  detailValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
    flex: 1,
  },
  descriptionText: {
    ...Typography.body,
    color: Colors.text,
    lineHeight: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  benefitText: {
    ...Typography.body,
    color: Colors.text,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  expiryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warningLight,
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.xl,
  },
  expiryText: {
    ...Typography.body,
    color: Colors.warning,
    marginLeft: Spacing.sm,
    fontWeight: '600',
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  errorText: {
    ...Typography.h3,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
});
