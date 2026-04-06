import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { AppInput } from '../components/common/AppInput';
import { AppButton } from '../components/common/AppButton';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { registerJobSeeker, verifyPhoneOtp } from '../services/authService';
import { handleApiError } from '../api/client';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Enter your full name'),
  phone: z.string().min(1, 'Phone number is required').min(11, 'Phone must be 11 digits'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
  confirm_password: z.string().min(1, 'Please confirm your password'),
  passport_number: z.string().min(1, 'Passport number is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [registeredPhone, setRegisteredPhone] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirm_password: '',
      passport_number: '',
      dob: '',
      gender: 'male',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await registerJobSeeker({
        name: data.name.trim(),
        phone: data.phone.trim(),
        email: data.email.trim(),
        password: data.password,
        confirm_password: data.confirm_password,
        passport_number: data.passport_number.trim().toUpperCase(),
        dob: data.dob,
        gender: data.gender,
      });

      if (response.status === true) {
        if (response.otp) {
          setRegisteredPhone(data.phone.trim());
          setShowOtpInput(true);
          Alert.alert(
            'Registration Successful',
            `Your account has been created. OTP: ${response.otp}`,
            [{ text: 'OK' }]
          );
        } else {
          Alert.alert('Success', response.message || 'Registration successful!', [
            { text: 'OK', onPress: () => router.back() }
          ]);
        }
      } else {
        const errorMsg = response.error 
          ? Object.values(response.error).flat().join(', ')
          : response.message || 'Registration failed. Please try again.';
        Alert.alert('Error', errorMsg);
      }
    } catch (error) {
      Alert.alert('Error', handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyPhoneOtp({
        phone: registeredPhone,
        otp: otp.trim(),
      });

      if (response.status === true) {
        Alert.alert('Success', 'Phone verified successfully!', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        Alert.alert('Error', response.message || 'Verification failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    router.back();
  };

  if (showOtpInput) {
    return (
      <ScreenContainer>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <Text style={styles.title}>Verify Phone</Text>
              <Text style={styles.subtitle}>
                Enter the OTP sent to your phone number
              </Text>
            </View>

            <View style={styles.form}>
              <AppInput
                label="OTP"
                placeholder="Enter OTP"
                keyboardType="number-pad"
                value={otp}
                onChangeText={setOtp}
              />

              <AppButton
                title="Verify"
                onPress={handleVerifyOtp}
                loading={isLoading}
                disabled={isLoading}
                style={styles.button}
              />

              <TouchableOpacity
                style={styles.resendButton}
                onPress={() => setShowOtpInput(false)}
              >
                <Text style={styles.resendText}>Back to Registration</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us to find your dream job</Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.name?.message}
                  autoCapitalize="words"
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Phone Number (11 digits)"
                  placeholder="e.g. 5012345678"
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.phone?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Email"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  autoCapitalize="none"
                />
              )}
            />

            <Controller
              control={control}
              name="passport_number"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Passport Number"
                  placeholder="Enter passport number"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.passport_number?.message}
                  autoCapitalize="characters"
                />
              )}
            />

            <Controller
              control={control}
              name="dob"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Date of Birth (YYYY-MM-DD)"
                  placeholder="e.g. 1995-01-01"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.dob?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.genderContainer}>
                  <Text style={styles.label}>Gender</Text>
                  <View style={styles.genderButtons}>
                    <TouchableOpacity
                      style={[
                        styles.genderButton,
                        value === 'male' && styles.genderButtonActive,
                      ]}
                      onPress={() => onChange('male')}
                    >
                      <Text style={[
                        styles.genderButtonText,
                        value === 'male' && styles.genderButtonTextActive,
                      ]}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.genderButton,
                        value === 'female' && styles.genderButtonActive,
                      ]}
                      onPress={() => onChange('female')}
                    >
                      <Text style={[
                        styles.genderButtonText,
                        value === 'female' && styles.genderButtonTextActive,
                      ]}>Female</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Password"
                  placeholder="Create a password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirm_password?.message}
                />
              )}
            />

            <AppButton
              title="Sign Up"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isLoading}
              style={styles.button}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.linkText}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.xxl,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  form: {
    marginBottom: Spacing.xl,
  },
  button: {
    marginTop: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  linkText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  resendButton: {
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  resendText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  label: {
    ...Typography.bodySmall,
    color: Colors.text,
    marginBottom: Spacing.sm,
    fontWeight: '600',
  },
  genderContainer: {
    marginBottom: Spacing.lg,
  },
  genderButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  genderButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    backgroundColor: Colors.surface,
  },
  genderButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  genderButtonText: {
    ...Typography.button,
    color: Colors.text,
  },
  genderButtonTextActive: {
    color: Colors.white,
  },
});
