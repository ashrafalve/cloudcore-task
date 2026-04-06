export const validatePhone = (phone: string): string | undefined => {
  if (!phone.trim()) {
    return 'Phone number is required';
  }
  const trimmedPhone = phone.trim();
  if (trimmedPhone.length < 10) {
    return 'Please enter a valid phone number';
  }
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password.trim()) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return undefined;
};

export const validateName = (name: string): string | undefined => {
  if (!name.trim()) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Please enter your full name';
  }
  return undefined;
};

export const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) {
    return undefined;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return undefined;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | undefined => {
  if (!confirmPassword.trim()) {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return undefined;
};

export const validateOtp = (otp: string): string | undefined => {
  if (!otp.trim()) {
    return 'OTP is required';
  }
  if (otp.trim().length < 4) {
    return 'Please enter a valid OTP';
  }
  return undefined;
};