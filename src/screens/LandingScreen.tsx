import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, StatusBar, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { LoadingState, ErrorState } from '../components/common/LoadingState';
import { SectionHeader } from '../components/common/SectionHeader';
import { HeroBanner } from '../components/landing/HeroBanner';
import { IndustryCard } from '../components/landing/IndustryCard';
import { JobCard } from '../components/landing/JobCard';
import { CompanyCard } from '../components/landing/CompanyCard';
import { useLandingData } from '../hooks/useLandingData';
import { useTheme } from '../theme/ThemeContext';
import { Spacing } from '../constants/spacing';
import { Industry, Job, Company } from '../types/api';

export const LandingScreen: React.FC = () => {
  const router = useRouter();
  const { colors, isDark, toggleTheme } = useTheme();
  const { industries, jobs, companies, isLoading, error, refresh } = useLandingData();

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleExploreJobs = () => {
    console.log('Explore jobs pressed');
  };

  const handleLogin = () => {
    router.push('/login' as never);
  };

  const handleIndustryPress = (industry: Industry) => {
    console.log('Industry pressed:', industry.name);
  };

  const handleJobPress = (job: Job) => {
    console.log('View job:', job.job_title, 'ID:', job.id);
  };

  const handleCompanyPress = (company: Company) => {
    console.log('Company pressed:', company.name);
  };

  const renderIndustrySection = () => {
    if (industries.length === 0 && !isLoading) {
      return null;
    }

    return (
      <View style={styles.section}>
        <SectionHeader title="Popular Industries" />
        <FlatList
          horizontal
          data={industries}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => (
            <View style={{ marginLeft: index === 0 ? Spacing.lg : 0, marginRight: Spacing.md }}>
              <IndustryCard industry={item} onPress={() => handleIndustryPress(item)} />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListEnd}
        />
      </View>
    );
  };

  const renderJobsSection = () => {
    if (jobs.length === 0 && !isLoading) {
      return null;
    }

    return (
      <View style={styles.section}>
        <SectionHeader title="Recommended Jobs" />
        <View style={styles.jobsContainer}>
          {jobs.slice(0, 5).map((job, index) => (
            <View key={String(job.id)}>
              <JobCard job={job} onPress={() => handleJobPress(job)} />
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderCompaniesSection = () => {
    if (companies.length === 0 && !isLoading) {
      return null;
    }

    return (
      <View style={styles.section}>
        <SectionHeader title="Popular Companies" />
        <FlatList
          horizontal
          data={companies}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => (
            <View style={{ marginLeft: index === 0 ? Spacing.lg : 0, marginRight: Spacing.md }}>
              <CompanyCard company={item} onPress={() => handleCompanyPress(item)} />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListEnd}
        />
      </View>
    );
  };

  if (isLoading && industries.length === 0 && jobs.length === 0 && companies.length === 0) {
    return (
      <ScreenContainer padded={false} style={{ backgroundColor: colors.background }}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <LoadingState fullScreen message="Loading jobs..." />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer padded={false} style={{ backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <>
            <HeroBanner 
              onExploreJobs={handleExploreJobs} 
              onLogin={handleLogin}
              isDark={isDark}
              onThemeToggle={toggleTheme}
            />
            {error && (
              <View style={styles.errorContainer}>
                <ErrorState message={error} onRetry={refresh} />
              </View>
            )}
            {renderIndustrySection()}
            {renderJobsSection()}
            {renderCompaniesSection()}
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.textMuted }]}>© 2026 BHC Jobs</Text>
            </View>
          </>
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: Spacing.xl,
  },
  section: {
    marginTop: Spacing.lg,
  },
  horizontalListEnd: {
    paddingRight: Spacing.lg,
  },
  jobsContainer: {
    paddingHorizontal: Spacing.lg,
  },
  errorContainer: {
    margin: Spacing.lg,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  footerText: {
    fontSize: 12,
  },
});