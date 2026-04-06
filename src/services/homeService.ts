import { axiosClient } from '../api/client';
import { ENDPOINTS } from '../constants/config';
import { Industry, Job, Company, ApiResponse } from '../types/api';

export const getIndustries = async (): Promise<Industry[]> => {
  try {
    const response = await axiosClient.get<ApiResponse<Industry[]>>(ENDPOINTS.INDUSTRIES);
    const data = response.data;
    if (data?.status === true && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.log('Error fetching industries:', error);
    return [];
  }
};

export const getJobs = async (): Promise<Job[]> => {
  try {
    const response = await axiosClient.get<ApiResponse<Job[]>>(ENDPOINTS.JOBS);
    const data = response.data;
    if (data?.status === true && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.log('Error fetching jobs:', error);
    return [];
  }
};

export const getCompanies = async (): Promise<Company[]> => {
  try {
    const response = await axiosClient.get<ApiResponse<Company[]>>(ENDPOINTS.COMPANIES);
    const data = response.data;
    if (data?.status === true && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.log('Error fetching companies:', error);
    return [];
  }
};

export const getLandingData = async () => {
  const [industries, jobs, companies] = await Promise.all([
    getIndustries(),
    getJobs(),
    getCompanies(),
  ]);
  return { industries, jobs, companies };
};
