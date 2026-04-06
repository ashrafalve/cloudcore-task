export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message?: string;
  token?: string;
  user?: {
    id: number;
    name?: string;
    phone?: string;
    email?: string;
  };
  error?: any;
}

export interface RegisterRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirm_password: string;
  passport_number: string;
  dob: string;
  gender: string;
}

export interface RegisterResponse {
  status: boolean;
  message?: string;
  otp?: string;
  user?: {
    id: number;
    name?: string;
    phone?: string;
    email?: string;
  };
  error?: any;
}

export interface PhoneVerifyRequest {
  phone: string;
  otp: string;
}

export interface PhoneVerifyResponse {
  status: boolean;
  message?: string;
  verified?: boolean;
  error?: any;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: RegisterResponse['user'] | null;
  token: string | null;
  isLoading: boolean;
}
