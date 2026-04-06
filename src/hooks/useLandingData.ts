import { useState, useCallback } from 'react';
import { getLandingData } from '../services/homeService';
import { Industry, Job, Company } from '../types/api';

interface LandingDataState {
  industries: Industry[];
  jobs: Job[];
  companies: Company[];
  isLoading: boolean;
  error: string | null;
}

export const useLandingData = () => {
  const [state, setState] = useState<LandingDataState>({
    industries: [],
    jobs: [],
    companies: [],
    isLoading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const data = await getLandingData();
      setState({
        industries: data.industries,
        jobs: data.jobs,
        companies: data.companies,
        isLoading: false,
        error: null,
      });
    } catch {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to load data. Please try again.',
      }));
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return {
    ...state,
    fetchData,
    refresh,
  };
};