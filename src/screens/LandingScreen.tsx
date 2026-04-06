import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { LoadingState, ErrorState, EmptyState } from '../components/common/LoadingState';
import { SectionHeader } from '../components/common/SectionHeader';
import { HeroBanner } from '../components/landing/HeroBanner';
import { IndustryCard } from '../components/landing/IndustryCard';
import { JobCard } from '../components/landing/JobCard';
import { CompanyCard } from '../components/landing/CompanyCard';
import { useLandingData } from '../hooks/useLandingData';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { Industry, Job, Company } from '../types/api';

export const LandingScreen: React.FC = () => {
  const router = useRouter();
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
    router.push(`/job/${job.id}` as any);
  };

  const handleCompanyPress = (company: Company) => {
    console.log('Company pressed:', company.name);
  };

  const renderIndustrySection = () => {
    if (industries.length === 0 && !isLoading) {
      return (
        <View style={styles.section}>
          <SectionHeader title="Popular Industries" />
          <EmptyState message="No industries available" />
        </View>
      );
    }

    return (
      <View style={styles.section}>
        <SectionHeader title="Popular Industries" />
        <FlatList
          horizontal
          data={industries}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <IndustryCard industry={item} onPress={() => handleIndustryPress(item)} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
    );
  };

  const renderJobsSection = () => {
    if (jobs.length === 0 && !isLoading) {
      return (
        <View style={styles.section}>
          <SectionHeader title="Recommended Jobs" />
          <EmptyState message="No jobs available" />
        </View>
      );
    }

    return (
      <View style={styles.section}>
        <SectionHeader title="Recommended Jobs" />
        {jobs.slice(0, 5).map((job) => (
          <JobCard key={String(job.id)} job={job} onPress={() => handleJobPress(job)} />
        ))}
      </View>
    );
  };

  const renderCompaniesSection = () => {
    if (companies.length === 0 && !isLoading) {
      return (
        <View style={styles.section}>
          <SectionHeader title="Popular Companies" />
          <EmptyState message="No companies available" />
        </View>
      );
    }

    return (
      <View style={styles.section}>
        <SectionHeader title="Popular Companies" />
        <FlatList
          horizontal
          data={companies}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CompanyCard company={item} onPress={() => handleCompanyPress(item)} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
    );
  };

  if (isLoading && industries.length === 0 && jobs.length === 0 && companies.length === 0) {
    return (
      <ScreenContainer padded={false}>
        <LoadingState fullScreen message="Loading..." />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer padded={false}>
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <>
            <HeroBanner onExploreJobs={handleExploreJobs} onLogin={handleLogin} />
            {error && (
              <View style={styles.errorContainer}>
                <ErrorState message={error} onRetry={refresh} />
              </View>
            )}
            {renderIndustrySection()}
            {renderJobsSection()}
            {renderCompaniesSection()}
          </>
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
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
    paddingBottom: Spacing.xxxl,
  },
  section: {
    marginTop: Spacing.xl,
  },
  horizontalList: {
    paddingHorizontal: Spacing.lg,
  },
  errorContainer: {
    margin: Spacing.lg,
  },
});