# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cross-platform metronome application built with **Expo Router**. Supports iOS, Android, and Web.

**Technology Stack:**
- **Expo SDK 54.0.23** (managed workflow)
- **Expo Router 6.0.14** - File-based routing with typed routes
- **React 19.1.0** with React Native 0.81.5
- **Node.js 20.17.0** (specified in `.nvmrc`)
- **Yarn 4.10.3** as package manager (via Corepack)
- **TypeScript 5.9.3** with extremely strict type checking
- **Reatom** (1000.0.0-alpha.51) - State management
- **React Native Reanimated 4.1.3** - Animations
- **Expo experimental features:**
  - React Compiler enabled
  - Typed routes enabled
  - New Architecture enabled

## Essential Commands

```bash
# First time setup
corepack enable
yarn install

# Development
yarn start                    # Start Expo development server
yarn ios                      # Run on iOS simulator
yarn android                  # Run on Android emulator/device
yarn web                      # Run in web browser

# Code quality
yarn lint                     # Run ESLint
yarn typecheck                # Run TypeScript type checking

# Utilities
yarn reset-project            # Reset project to initial state
```

## Architecture

Expo Router application with file-based routing and tab navigation:

```
metronome/
├── app/                      # Expo Router pages (file-based routing)
│   ├── (tabs)/              # Tab navigation group
│   │   ├── index.tsx        # Home screen (tab 1)
│   │   ├── explore.tsx      # Explore screen (tab 2)
│   │   └── _layout.tsx      # Tab bar layout configuration
│   ├── _layout.tsx          # Root layout (fonts, splash screen, etc.)
│   └── modal.tsx            # Modal screen example
├── components/              # Reusable React components
│   ├── ui/                  # UI component library
│   │   ├── collapsible.tsx
│   │   ├── icon-symbol.tsx  # iOS SF Symbols support
│   │   └── icon-symbol.ios.tsx
│   ├── themed-text.tsx      # Theme-aware text component
│   ├── themed-view.tsx      # Theme-aware view component
│   ├── parallax-scroll-view.tsx
│   ├── hello-wave.tsx
│   ├── haptic-tab.tsx
│   └── external-link.tsx
├── hooks/                   # Custom React hooks
│   ├── use-color-scheme.ts  # Color scheme detection
│   ├── use-color-scheme.web.ts
│   └── use-theme-color.ts   # Theme color hook
├── constants/               # App constants and configuration
│   └── theme.ts             # Theme constants (colors, etc.)
├── assets/                  # Images, fonts, and other static files
│   └── images/
├── .github/workflows/       # CI/CD configuration
│   └── ci.yml              # ESLint and TypeScript checks
├── app.json                # Expo configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── eslint.config.js        # ESLint configuration
└── expo-env.d.ts           # TypeScript environment declarations
```

**Entry Point:** `expo-router/entry` (configured in `package.json` main field)

**Navigation:** Expo Router with file-based routing. Files in `app/` directory automatically become routes.

## Running the App

### Development Server

```bash
# Start the Expo development server
yarn start
```

This opens the Expo Dev Tools in your terminal. You can then:
- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Press `w` to open in web browser
- Scan QR code with Expo Go app for physical devices

### Platform-Specific Commands

```bash
# iOS Simulator (macOS only, requires Xcode)
yarn ios

# Android Emulator/Device (requires Android Studio)
yarn android

# Web Browser
yarn web
```

### On Physical Devices

**Option 1: Expo Go App (Development)**
1. Install Expo Go from App Store (iOS) or Play Store (Android)
2. Run `yarn start`
3. Scan QR code with camera (iOS) or Expo Go app (Android)

**Option 2: Development Build (Recommended for Production)**
1. Generate native projects: `npx expo prebuild`
2. This creates `ios/` and `android/` directories
3. Follow platform-specific build instructions

## Code Quality Standards

### TypeScript Configuration

Extremely strict settings (`tsconfig.json`):

**Strict Mode (all enabled):**
- `strict: true` - All strict type-checking options
- `noImplicitAny` - Error on expressions with implied 'any' type
- `strictNullChecks` - Null and undefined must be explicitly handled
- `strictFunctionTypes` - Strict checking of function types
- `strictBindCallApply` - Strict 'bind', 'call', and 'apply' methods
- `strictPropertyInitialization` - Class properties must be initialized
- `noImplicitThis` - Error on 'this' expressions with implied 'any'
- `alwaysStrict` - Parse in strict mode and emit "use strict"

**Additional Checks:**
- `noUnusedLocals` - Error on unused local variables
- `noUnusedParameters` - Error on unused function parameters
- `noImplicitReturns` - Error on code paths that don't return a value
- `noFallthroughCasesInSwitch` - Error on fallthrough cases in switch
- `noUncheckedIndexedAccess` - Array/object access requires null checks
- `noImplicitOverride` - Require explicit 'override' keyword
- `noPropertyAccessFromIndexSignature` - Enforce indexed access for index signatures
- `exactOptionalPropertyTypes` - Optional properties cannot be set to undefined

**Advanced Options:**
- `forceConsistentCasingInFileNames` - Ensure consistent file name casing
- `allowUnusedLabels: false` - Error on unused labels
- `allowUnreachableCode: false` - Error on unreachable code

### ESLint Configuration

Uses **`eslint-config-expo`** for Expo-specific linting with TypeScript support:
- TypeScript ESLint plugin enabled
- React and React Native best practices
- Type-aware linting with project references
- Note: `eslint-config-love` is present but currently commented out

**File Coverage:**
- TypeScript files (`.ts`, `.tsx`) - Full type-aware linting
- JavaScript files (`.js`, `.jsx`) - Standard linting

**Ignored Paths:**
- `node_modules/`, `ios/`, `android/`, `.bundle/`, `dist/`, `build/`, `coverage/`
- Config files (`.config.js`, `babel.config.js`, `metro.config.js`)
- `.yarn/` directory

### CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on:
- Push to `master` branch
- All pull requests

**Jobs:**
1. **ESLint** - Code quality and style checks
2. **TypeScript** - Type checking (no emit)

Both jobs use Node.js version from `.nvmrc` and Yarn caching for speed.

## State Management

The project uses **Reatom** for state management:
- Version: 1000.0.0-alpha.51
- Core package: `@reatom/core`
- React integration: `@reatom/react`

Reatom provides reactive state management with atoms and actions.

## Important Notes

### Package Manager
- **Always use `yarn`** (not npm) - project uses Yarn 4.10.3
- Use correct Node version: `nvm use` (reads `.nvmrc`)
- Yarn is managed via Corepack: `corepack enable`

### Expo Specifics
- This is an **Expo managed workflow** - no native `ios/` or `android/` directories by default
- Native directories only created after running `npx expo prebuild`
- All native modules must be compatible with Expo
- Configuration in `app.json` controls native app settings

### Routing
- **File-based routing** via Expo Router
- Files in `app/` directory automatically become routes
- `(tabs)` is a layout group (parentheses don't appear in URL)
- `_layout.tsx` files define layout for their directory
- Typed routes enabled - import routes from `expo-router` for type safety

### Theming
- Supports light/dark mode (automatic based on system)
- Theme colors defined in `constants/theme.ts`
- Use `ThemedText` and `ThemedView` components for automatic theme adaptation
- `useColorScheme()` hook for theme detection

### Performance
- React Compiler enabled (experimental) - automatic memoization
- New Architecture enabled - improved performance and capabilities
- Reanimated 4 for smooth 60fps animations

### Platform Support
- **iOS:** Full support, SF Symbols integration
- **Android:** Edge-to-edge enabled, adaptive icons
- **Web:** Static site generation enabled
