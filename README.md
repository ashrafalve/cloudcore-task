# BhcJobs - React Native Expo App

A production-quality recruitment app built with React Native and Expo for the BHC Jobs platform.

## Features

### Landing Page
- Hero/Banner section with job search CTA
- Popular Industries section (fetched from API)
- Recommended Jobs section (fetched from API)
- Popular Companies section (fetched from API)
- Pull-to-refresh functionality
- Loading, error, and empty states

### Login Screen
- Phone number input with validation
- Password input with validation
- Form validation using Zod + React Hook Form
- Loading indicator during API calls
- Error handling with user-friendly messages
- Navigation to registration screen

### Registration Screen
- Full name, phone, email, password fields
- Password confirmation
- Form validation using Zod + React Hook Form
- OTP verification flow (if returned from API)
- Loading indicator during API calls
- Error handling with user-friendly messages
- Navigation to login screen

## Tech Stack

- **Framework**: React Native with Expo (SDK 54)
- **Language**: TypeScript
- **Navigation**: React Navigation (Native Stack)
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod
- **UI**: Custom components with StyleSheet

## Project Structure

```
src/
├── api/
│   └── client.ts          # Axios client configuration
├── components/
│   ├── common/
│   │   ├── AppButton.tsx   # Reusable button component
│   │   ├── AppInput.tsx   # Reusable input component
│   │   ├── LoadingState.tsx # Loading, error, empty states
│   │   ├── SectionHeader.tsx # Section header with See All
│   │   └── ScreenContainer.tsx # Screen wrapper
│   └── landing/
│       ├── HeroBanner.tsx  # Landing hero section
│       ├── IndustryCard.tsx # Industry card
│       ├── JobCard.tsx     # Job listing card
│       └── CompanyCard.tsx # Company card
├── constants/
│   ├── colors.ts           # Color palette
│   ├── spacing.ts         # Spacing values
│   ├── typography.ts      # Typography styles
│   └── config.ts          # API configuration
├── hooks/
│   └── useLandingData.ts  # Landing page data hook
├── navigation/
│   ├── RootNavigator.tsx   # Main navigation setup
│   └── routeNames.ts      # Route type definitions
├── screens/
│   ├── LandingScreen.tsx  # Landing page
│   ├── LoginScreen.tsx    # Login page
│   └── RegisterScreen.tsx # Registration page
├── services/
│   ├── authService.ts     # Authentication API calls
│   └── homeService.ts     # Home/Landing API calls
├── store/
│   └── authStore.ts       # Zustand auth store
├── types/
│   ├── api.ts             # API response types
│   ├── auth.ts            # Auth types
│   └── navigation.ts      # Navigation types
└── utils/
    └── validators.ts      # Validation utilities
```

## API Endpoints

Base URL: `https://dev.bhcjobs.com`

### GET Endpoints
- `/api/industry/get` - Get list of industries
- `/api/job/get` - Get list of jobs
- `/api/company/get` - Get list of companies

### POST Endpoints
- `/api/job_seeker/register` - Register new job seeker
- `/api/job_seeker/phone_verify` - Verify phone with OTP
- `/api/job_seeker/login` - Login with phone and password

## API Assumptions

Since the exact API response format was not documented, the following assumptions were made:

1. **Industry/Job/Company responses**: The API may return data in either of these formats:
   - Direct array: `[{ id: 1, name: "..." }]`
   - Wrapped response: `{ data: [{ id: 1, name: "..." }], message: "..." }`

2. **Register response**: Expected to return either:
   - OTP directly in response: `{ success: true, otp: "1234" }`
   - Success status: `{ success: true, message: "..." }`

3. **Login response**: Expected to return:
   - Token: `{ success: true, token: "...", user: {...} }`

4. **Phone verification**: Uses phone number and OTP to verify user.

## Setup & Installation

### Prerequisites
- Node.js (LTS version)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the App

#### Development
```bash
# Start Expo dev server
npx expo start

# Or run on specific platform
npx expo start --android
npx expo start --ios
```

#### Running on Emulator/Device

1. **Android**:
   ```bash
   npx expo start --android
   ```

2. **iOS** (on Mac):
   ```bash
   npx expo start --ios
   ```

3. **QR Code**: Scan the QR code with Expo Go app on your device

### Building APK

#### Using EAS Build (Recommended)

1. Configure EAS (if not already):
   ```bash
   npx expo eas init
   ```

2. Build for Android:
   ```bash
   npx expo eas build -p android
   ```

3. Download the APK from the build output

#### Using Expo Prebuild (Local Build)

1. Generate native Android project:
   ```bash
   npx expo prebuild --platform android
   ```

2. Build debug APK:
   ```bash
   cd android
   ./gradlew assembleDebug
   ```

The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

## Validation Rules

### Login
- Phone: Required, minimum 10 characters
- Password: Required, minimum 6 characters

### Registration
- Name: Required, minimum 2 characters
- Phone: Required, minimum 10 characters
- Email: Optional, must be valid email format
- Password: Required, minimum 6 characters
- Confirm Password: Required, must match password

### OTP Verification
- OTP: Required, minimum 4 characters

## Error Handling

- Network errors: "Network error. Please check your connection."
- Timeout: "Request timeout. Please try again."
- Validation errors: Displayed inline below each field
- API errors: Displayed as alert with friendly message

## Limitations

- No social login implemented
- No token refresh mechanism
- No secure storage for tokens
- No backend integration beyond provided APIs

## Libraries Used

- expo (54.0.33)
- react-native (0.81.5)
- @react-navigation/native (7.1.8)
- @react-navigation/native-stack
- axios
- zustand
- react-hook-form
- @hookform/resolvers
- zod

## License

This project is for assessment purposes.