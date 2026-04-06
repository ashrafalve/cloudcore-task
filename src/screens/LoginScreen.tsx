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
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { loginJobSeeker } from '../services/authService';
import { handleApiError } from '../api/client';

const loginSchema = z.object({
  phone: z.string().min(1, 'Phone number is required').min(11, 'Phone must be 11 digits'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await loginJobSeeker({
        phone: data.phone.trim(),
        password: data.password,
      });

      if (response.status === true) {
        Alert.alert('Success', 'Login successful!', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        const errorMsg = response.error 
          ? Object.values(response.error).flat().join(', ')
          : response.message || 'Login failed. Please try again.';
        Alert.alert('Error', errorMsg);
      }
    } catch (error) {
      Alert.alert('Error', handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerSection}>
            <View style={styles.logoCircle}>
              <Ionicons name="briefcase" size={36} color={Colors.primary} />
            </View>
            <Text style={styles.title}>BHC Jobs</Text>
            <Text style={styles.subtitle}>Welcome back!</Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.inputWrapper}>
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={20} color={Colors.textMuted} />
                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Phone Number"
                      placeholderTextColor={Colors.textMuted}
                      keyboardType="phone-pad"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      maxLength={11}
                    />
                  )}
                />
              </View>
              {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
            </View>

            <View style={styles.inputWrapper}>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={Colors.textMuted} />
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor={Colors.textMuted}
                      secureTextEntry={!showPassword}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons 
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                    size={20} 
                    color={Colors.textMuted} 
                  />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>

            <TouchableOpacity style={styles.forgotButton}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={styles.loginButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.footerSection}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text style={styles.signupText}> Sign Up</Text>
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
    marginTop: Spacing.xxxl + Spacing.xl,
    marginBottom: Spacing.xl,
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
    marginBottom: Spacing.xl,
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
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.error,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.lg,
  },
  forgotText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default LoginScreen;
