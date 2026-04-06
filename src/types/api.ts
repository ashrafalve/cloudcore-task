export interface Industry {
  id: number;
  priority: number;
  name: string;
  is_active: number;
  image?: string;
  jobs_count?: number;
}

export interface Job {
  id: number;
  company_id: number;
  category_id: number;
  country_id: number;
  industry_id: number;
  city_id: number | null;
  designation_id: number;
  job_title: string;
  slug: string;
  priority: number;
  address: string | null;
  company_name: string;
  industry_name: string;
  is_active: number;
  salary_type: string;
  currency: string;
  min_salary: number;
  max_salary: number;
  employment_type: string;
  gender: string;
  min_age: number;
  max_age: number;
  vacancy: number;
  experience?: string;
  job_desc?: string;
  job_requirement?: string;
  recruitment_process?: string;
  type?: string;
  expiry?: string;
  medical_service?: string;
  visa_profession?: string;
  accommodation?: string;
  food_option?: string;
  food_amount?: string;
  transportation?: string;
  iqama?: string;
  is_trending?: number;
  is_hot?: number;
  view_count?: number;
  created_at?: string;
  country?: {
    id: number;
    name: string;
  };
  city?: any;
  company?: {
    id: number;
    name: string;
    slug: string;
    desc?: string;
    image?: string;
    industry?: {
      id: number;
      name: string;
    };
    country?: {
      id: number;
      name: string;
    };
  };
  category?: any;
  benefits?: Array<{
    id: number;
    name: string;
  }>;
}

export interface Company {
  id: number;
  name: string;
  is_active: number;
  slug: string;
  image?: string;
  jobs_count?: number;
  description?: string;
}

export interface ApiResponse<T> {
  status: boolean;
  message?: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total?: number;
  page?: number;
  limit?: number;
}
