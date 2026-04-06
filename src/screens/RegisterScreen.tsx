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
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { useTheme } from '../theme/ThemeContext';

const ActivityIndicator = require('react-native').ActivityIndicator;

const InputField = ({ 
  icon,
  placeholder,
  value,
  onChangeText,
  error,
  keyboardType = 'default',
  secureTextEntry = false,
  maxLength,
  editable = true,
  colors,
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
  colors: any;
}) => (
  <View style={styles.inputWrapper}>
    <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: error ? colors.error : colors.border }]}>
      <Ionicons name={icon as any} size={20} color={colors.textMuted} />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
      />
    </View>
    {error && <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>}
  </View>
);

export const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
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

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Registration functionality coming soon!');
    }, 1000);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.headerSection}>
            <Image 
              source={require('../../assets/images/logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Join BHC Jobs today</Text>
          </View>

          <View style={styles.formSection}>
            <InputField
              icon="person-outline"
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(v) => updateField('name', v)}
              error={errors.name}
              colors={colors}
            />
            <InputField
              icon="call-outline"
              placeholder="Phone Number (11 digits)"
              value={formData.phone}
              onChangeText={(v) => updateField('phone', v)}
              error={errors.phone}
              keyboardType="phone-pad"
              maxLength={11}
              colors={colors}
            />
            <InputField
              icon="mail-outline"
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(v) => updateField('email', v)}
              error={errors.email}
              keyboardType="email-address"
              colors={colors}
            />
            <InputField
              icon="card-outline"
              placeholder="Passport Number"
              value={formData.passport_number}
              onChangeText={(v) => updateField('passport_number', v)}
              error={errors.passport_number}
              colors={colors}
            />
            <InputField
              icon="calendar-outline"
              placeholder="Date of Birth (YYYY-MM-DD)"
              value={formData.dob}
              onChangeText={(v) => updateField('dob', v)}
              error={errors.dob}
              colors={colors}
            />

            <View style={styles.genderContainer}>
              <Text style={[styles.genderLabel, { color: colors.text }]}>Gender</Text>
              <View style={styles.genderButtons}>
                <TouchableOpacity 
                  style={[
                    styles.genderButton, 
                    { backgroundColor: colors.surface, borderColor: colors.border },
                    formData.gender === 'male' && { backgroundColor: colors.primary, borderColor: colors.primary }
                  ]}
                  onPress={() => updateField('gender', 'male')}
                >
                  <Ionicons 
                    name="male" 
                    size={20} 
                    color={formData.gender === 'male' ? colors.white : colors.text} 
                  />
                  <Text style={[
                    styles.genderText, 
                    { color: formData.gender === 'male' ? colors.white : colors.text }
                  ]}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.genderButton, 
                    { backgroundColor: colors.surface, borderColor: colors.border },
                    formData.gender === 'female' && { backgroundColor: colors.primary, borderColor: colors.primary }
                  ]}
                  onPress={() => updateField('gender', 'female')}
                >
                  <Ionicons 
                    name="female" 
                    size={20} 
                    color={formData.gender === 'female' ? colors.white : colors.text} 
                  />
                  <Text style={[
                    styles.genderText, 
                    { color: formData.gender === 'female' ? colors.white : colors.text }
                  ]}>Female</Text>
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
              colors={colors}
            />
            <InputField
              icon="lock-closed-outline"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChangeText={(v) => updateField('confirm_password', v)}
              error={errors.confirm_password}
              secureTextEntry={!showPassword}
              colors={colors}
            />

            <TouchableOpacity 
              style={[styles.loginButton, { backgroundColor: isLoading ? colors.textMuted : colors.primary }]} 
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={[styles.loginButtonText, { color: colors.white }]}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.footerSection}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={[styles.signupText, { color: colors.primary }]}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  logoImage: {
    height: 80,
    width: 200,
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.body,
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
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    height: 56,
  },
  input: {
    flex: 1,
    ...Typography.body,
    marginLeft: Spacing.sm,
  },
  errorText: {
    ...Typography.caption,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  genderContainer: {
    marginBottom: Spacing.md,
  },
  genderLabel: {
    ...Typography.bodySmall,
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
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  genderText: {
    ...Typography.body,
  },
  loginButton: {
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
  },
  loginButtonText: {
    ...Typography.button,
  },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  footerText: {
    ...Typography.body,
  },
  signupText: {
    ...Typography.body,
    fontWeight: '700',
  },
});

export default RegisterScreen;