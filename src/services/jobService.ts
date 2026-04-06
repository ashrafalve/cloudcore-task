import { axiosClient } from '../api/client';
import { ENDPOINTS } from '../constants/config';
import { Job, ApiResponse } from '../types/api';

export const getJobById = async (id: number): Promise<Job | null> => {
  try {
    const response = await axiosClient.get<ApiResponse<Job[]>>(`${ENDPOINTS.JOBS}?id=${id}`);
    const data = response.data;
    if (data?.status === true && Array.isArray(data.data) && data.data.length > 0) {
      return data.data[0];
    }
    return null;
  } catch (error) {
    console.log('Error fetching job:', error);
    return null;
  }
};
