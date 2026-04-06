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
  TextInput,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { registerJobSeeker, verifyPhoneOtp } from '../services/authService';
import { handleApiError } from '../api/client';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Enter your full name'),
  phone: z.string().min(1, 'Phone number is required').min(11, 'Phone must be 11 digits'),
  email: z.string().email('Enter a valid email'),
  passport_number: z.string().min(1, 'Passport number is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
  confirm_password: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const InputField = ({ 
  icon,
  placeholder,
  value,
  onChangeText,
  error,
  keyboardType = 'default',
  secureTextEntry = false,
  maxLength,
  editable = true
}: { 
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  maxLength?: number;
  editable?: boolean;
}) => (
  <View style={styles.inputWrapper}>
    <View style={[styles.inputContainer, error && styles.inputError]}>
      <Ionicons name={icon as any} size={20} color={Colors.textMuted} />
      <TextInput
        style={[styles.input, !editable && styles.inputDisabled]}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
      />
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

export const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [registeredPhone, setRegisteredPhone] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    passport_number: '',
    dob: '',
    gender: 'male',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (formData.phone.length < 11) newErrors.phone = 'Phone must be 11 digits';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.passport_number.trim()) newErrors.passport_number = 'Passport is required';
    if (!formData.dob.trim()) newErrors.dob = 'Date of birth is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 characters';
    if (formData.password !== formData.confirm_password) newErrors.confirm_password = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await registerJobSeeker({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirm_password: formData.confirm_password,
        passport_number: formData.passport_number.trim().toUpperCase(),
        dob: formData.dob,
        gender: formData.gender,
      });

      if (response.status === true) {
        if (response.otp) {
          setRegisteredPhone(formData.phone.trim());
          setShowOtpInput(true);
          Alert.alert('Registration Successful', `OTP: ${response.otp}`, [{ text: 'OK' }]);
        } else {
          Alert.alert('Success', response.message || 'Registration successful!', [
            { text: 'OK', onPress: () => router.back() }
          ]);
        }
      } else {
        const errorMsg = response.error 
          ? Object.values(response.error).flat().join(', ')
          : response.message || 'Registration failed';
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
        Alert.alert('Error', response.message || 'Verification failed');
      }
    } catch (error) {
      Alert.alert('Error', handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  if (showOtpInput) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.otpHeader}>
              <View style={styles.otpLogoCircle}>
                <Ionicons name="shield-checkmark" size={36} color={Colors.primary} />
              </View>
              <Text style={styles.otpTitle}>Verify Phone</Text>
              <Text style={styles.otpSubtitle}>Enter the OTP sent to your phone</Text>
            </View>

            <View style={styles.otpInputContainer}>
              <TextInput
                style={styles.otpInput}
                placeholder="Enter OTP"
                placeholderTextColor={Colors.textMuted}
                keyboardType="number-pad"
                value={otp}
                onChangeText={setOtp}
                maxLength={6}
              />
            </View>

            <TouchableOpacity 
              style={[styles.otpButton, isLoading && styles.loginButtonDisabled]} 
              onPress={handleVerifyOtp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={styles.otpButtonText}>Verify</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => setShowOtpInput(false)}>
              <Text style={styles.backButtonText}>Back to Registration</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.headerSection}>
            <View style={styles.logoCircle}>
              <Ionicons name="person-add" size={36} color={Colors.primary} />
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join BHC Jobs today</Text>
          </View>

          <View style={styles.formSection}>
            <InputField
              icon="person-outline"
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(v) => updateField('name', v)}
              error={errors.name}
            />
            <InputField
              icon="call-outline"
              placeholder="Phone Number (11 digits)"
              value={formData.phone}
              onChangeText={(v) => updateField('phone', v)}
              error={errors.phone}
              keyboardType="phone-pad"
              maxLength={11}
            />
            <InputField
              icon="mail-outline"
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(v) => updateField('email', v)}
              error={errors.email}
              keyboardType="email-address"
            />
            <InputField
              icon="card-outline"
              placeholder="Passport Number"
              value={formData.passport_number}
              onChangeText={(v) => updateField('passport_number', v)}
              error={errors.passport_number}
            />
            <InputField
              icon="calendar-outline"
              placeholder="Date of Birth (YYYY-MM-DD)"
              value={formData.dob}
              onChangeText={(v) => updateField('dob', v)}
              error={errors.dob}
            />

            <View style={styles.genderContainer}>
              <Text style={styles.genderLabel}>Gender</Text>
              <View style={styles.genderButtons}>
                <TouchableOpacity 
                  style={[styles.genderButton, formData.gender === 'male' && styles.genderButtonActive]}
                  onPress={() => updateField('gender', 'male')}
                >
                  <Ionicons name="male" size={20} color={formData.gender === 'male' ? Colors.white : Colors.text} />
                  <Text style={[styles.genderText, formData.gender === 'male' && styles.genderTextActive]}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.genderButton, formData.gender === 'female' && styles.genderButtonActive]}
                  onPress={() => updateField('gender', 'female')}
                >
                  <Ionicons name="female" size={20} color={formData.gender === 'female' ? Colors.white : Colors.text} />
                  <Text style={[styles.genderText, formData.gender === 'female' && styles.genderTextActive]}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>

            <InputField
              icon="lock-closed-outline"
              placeholder="Password"
              value={formData.password}
              onChangeText={(v) => updateField('password', v)}
              error={errors.password}
              secureTextEntry={!showPassword}
            />
            <InputField
              icon="lock-closed-outline"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChangeText={(v) => updateField('confirm_password', v)}
              error={errors.confirm_password}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
              onPress={onSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={styles.loginButtonText}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.footerSection}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.signupText}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const ActivityIndicator = require('react-native').ActivityIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  formSection: {
    marginBottom: Spacing.lg,
  },
  inputWrapper: {
    marginBottom: Spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    height: 56,
  },
  inputError: {
    borderColor: Colors.error,
  },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  inputDisabled: {
    color: Colors.textMuted,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.error,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  genderContainer: {
    marginBottom: Spacing.md,
  },
  genderLabel: {
    ...Typography.bodySmall,
    color: Colors.text,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  genderButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  genderButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  genderText: {
    ...Typography.body,
    color: Colors.text,
  },
  genderTextActive: {
    color: Colors.white,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
  },
  loginButtonDisabled: {
    backgroundColor: Colors.textMuted,
  },
  loginButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  footerText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  signupText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '700',
  },
  otpHeader: {
    alignItems: 'center',
    marginTop: Spacing.xxxl,
    marginBottom: Spacing.xl,
  },
  otpLogoCircle: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  otpTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  otpSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  otpInputContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  otpInput: {
    ...Typography.h2,
    color: Colors.text,
    textAlign: 'center',
    paddingVertical: Spacing.lg,
  },
  otpButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  otpButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
  backButton: {
    alignItems: 'center',
  },
  backButtonText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default RegisterScreen;
