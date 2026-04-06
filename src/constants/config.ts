export const API_BASE_URL = 'https://dev.bhcjobs.com';

export const ENDPOINTS = {
  INDUSTRIES: '/api/industry/get',
  JOBS: '/api/job/get',
  COMPANIES: '/api/company/get',
  REGISTER: '/api/job_seeker/register',
  PHONE_VERIFY: '/api/job_seeker/phone_verify',
  LOGIN: '/api/job_seeker/login',
} as const;