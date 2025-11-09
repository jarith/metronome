# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native iOS application using Metro bundler. The project uses:
- **React Native 0.82.1** with React 19.2.0
- **Node.js 24.9.0** (specified in `.nvmrc`)
- **Yarn 4.10.3** as package manager (managed via Corepack)
- **TypeScript** with extremely strict type checking
- **Swift** for iOS native code (following React Native 0.77+ best practices)
- **Hermes** JavaScript engine for performance
- **Metro bundler** (the standard React Native bundler, not Vite)

## Essential Commands

### Development
```bash
# Install dependencies (first time setup)
corepack enable
yarn install
cd ios && pod install && cd ..

# Start Metro bundler
yarn start

# Run on iOS simulator (in a separate terminal)
yarn ios

# Run on specific simulator
yarn react-native run-ios --simulator="iPhone 15 Pro"
```

### Code Quality
```bash
# Run ESLint
yarn lint

# Run TypeScript type checking
yarn type-check
```

### Troubleshooting
```bash
# Kill Metro bundler on port 8081
lsof -ti:8081 | xargs kill -9

# Clean CocoaPods
cd ios && rm -rf Pods Podfile.lock && pod cache clean --all && pod install && cd ..

# Clear Metro cache
yarn start --reset-cache

# Clean Xcode build
cd ios && xcodebuild clean -workspace Metronome.xcworkspace -scheme Metronome && cd ..
```

## Architecture

### Project Structure
```
metronome/
├── App.tsx                # Main React component
├── index.js               # Entry point (registers App component)
├── package.json           # Dependencies (Yarn 4.10.3)
├── metro.config.js        # Metro bundler configuration
├── tsconfig.json          # TypeScript configuration (strict mode)
├── eslint.config.mjs      # ESLint configuration
├── babel.config.js        # Babel configuration
└── ios/                   # iOS native code
    ├── Podfile            # CocoaPods dependencies
    ├── Metronome/
    │   ├── AppDelegate.swift  # Swift app delegate
    │   └── Info.plist
    └── Metronome.xcodeproj/
```

### Key Architecture Details

**React Native Structure:**
- Entry point is `index.js` which imports and registers the App component from `App.tsx`
- `App.tsx` contains the main React component using React Native components (`SafeAreaView`, `View`, `Text`, etc.)
- Styling uses React Native's `StyleSheet.create()` API
- Uses functional components with TypeScript typing

**iOS Native Layer:**
- Native code is written in **Swift** (not Objective-C)
- `AppDelegate.swift` handles the React Native bridge initialization
- Minimum iOS deployment target: **13.4**
- Uses CocoaPods for iOS dependency management
- Hermes engine is enabled by default in `Podfile`

**Metro Bundler:**
- Metro is the standard bundler for React Native (not Webpack or Vite)
- Configuration in `metro.config.js` uses default React Native Metro config
- Handles JavaScript bundling, asset management, and hot reloading

## Code Quality Standards

### TypeScript Configuration
The project uses **extremely strict TypeScript settings** (tsconfig.json):
- All strict checks enabled (`strict: true`)
- `noUnusedLocals` and `noUnusedParameters`
- `noImplicitReturns` and `noFallthroughCasesInSwitch`
- `noUncheckedIndexedAccess` (requires null checks for array access)
- `exactOptionalPropertyTypes` (optional properties cannot be set to undefined)
- `noPropertyAccessFromIndexSignature` (requires bracket notation for index signatures)

**When writing TypeScript code:**
- All variables, parameters, and return types must be explicitly typed or inferable
- Array access requires null checks due to `noUncheckedIndexedAccess`
- Optional properties are treated strictly with `exactOptionalPropertyTypes`

### ESLint Configuration
Uses `eslint-config-love` for extremely strict TypeScript linting:
- Enforces functional programming patterns
- Requires explicit return types on functions
- Strict naming conventions
- No implicit any types allowed

### CI/CD
GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every PR and push to main/master:
1. **Lint and Type Check** (Ubuntu): Runs ESLint and TypeScript checks
2. **Build iOS** (macOS): Installs dependencies, CocoaPods, and builds iOS app for simulator

## React Native Specifics

### Running on Physical iOS Device
1. Connect iPhone via USB
2. Enable Developer Mode on iPhone (Settings > Privacy & Security)
3. Open `ios/Metronome.xcworkspace` in Xcode (NOT `.xcodeproj`)
4. Select device, configure signing with Apple ID
5. Start Metro bundler: `yarn start`
6. Build and run from Xcode (Cmd + R)
7. Trust developer certificate on iPhone if first time

### Common Patterns
- Use React Native built-in components (`View`, `Text`, `SafeAreaView`, etc.)
- Styling uses `StyleSheet.create()` for performance
- Status bar configuration via `StatusBar` component
- Safe areas handled by `SafeAreaView` component

### Important Notes
- Always use `yarn` (not npm) - project uses Yarn 4.10.3
- Always use the correct Node version via `nvm use` (reads `.nvmrc`)
- After pulling changes that modify iOS dependencies, run `cd ios && pod install && cd ..`
- Always open `.xcworkspace` in Xcode, never `.xcodeproj` (CocoaPods requirement)
- Metro bundler must be running before launching the app
