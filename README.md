# BHC Jobs - React Native Expo App

A production-ready recruitment mobile app for BHC Jobs platform.

## Features

- **Landing Page** - Hero banner, industries, jobs, companies (API-fetched), pull-to-refresh
- **Login** - Phone + password, validation, loading states, error handling
- **Registration** - Full form with OTP verification flow
- **Dark Mode** - Theme toggle in hero banner
- **Splash Screen** - Custom branded splash with logo

## Tech Stack

- React Native + Expo (SDK 54)
- TypeScript
- React Navigation
- Axios for API calls

## Project Structure

```
src/
├── api/client.ts           # Axios config
├── components/             # UI components
├── constants/              # Colors, spacing, typography, config
├── hooks/                  # Custom hooks
├── screens/                # App screens
├── services/               # API services
├── theme/                  # Theme context (light/dark)
└── types/                  # TypeScript types
```

## API Endpoints

Base: `https://dev.bhcjobs.com`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/industry/get` | Industries list |
| GET | `/api/job/get` | Jobs list |
| GET | `/api/company/get` | Companies list |
| POST | `/api/job_seeker/register` | Register new user |
| POST | `/api/job_seeker/phone_verify` | Verify OTP |
| POST | `/api/job_seeker/login` | User login |

## Setup

```bash
npm install
npx expo start
```

## Build APK

```bash
npx expo prebuild --platform android
cd android && ./gradlew assembleDebug
```

App Package: `com.bhcjobs.app`

## Theme Colors

- Light: White background (#FFFFFF), Dark text (#1E293B)
- Dark: Slate background (#0F172A), Light text (#F8FAFC)

Toggle in hero banner top-right corner.

## License

For assessment purposes.