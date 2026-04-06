import { axiosClient } from '../api/client';
import { ENDPOINTS } from '../constants/config';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, PhoneVerifyRequest, PhoneVerifyResponse } from '../types/auth';

export const loginJobSeeker = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axiosClient.post<LoginResponse>(ENDPOINTS.LOGIN, data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

export const registerJobSeeker = async (data: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await axiosClient.post<RegisterResponse>(ENDPOINTS.REGISTER, data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

export const verifyPhoneOtp = async (data: PhoneVerifyRequest): Promise<PhoneVerifyResponse> => {
  try {
    const response = await axiosClient.post<PhoneVerifyResponse>(ENDPOINTS.PHONE_VERIFY, data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};
