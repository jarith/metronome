# Metronome - React Native iOS App

A React Native application for iOS that displays "Hello World" on a purple background.

## Prerequisites

Before you begin, ensure you have the following installed on your Mac:

- macOS 10.15 (Catalina) or later
- Xcode 13.4 or later (available from the Mac App Store)
- Node.js 24.9.0 or later (managed via nvm recommended)
- Yarn 4.10+ (managed via Corepack)
- CocoaPods (dependency manager for iOS)
- Watchman (file watching service)

### Installing Prerequisites

1. **Install Xcode:**
   ```bash
   # Download from Mac App Store or run:
   xcode-select --install
   ```

2. **Install Node.js (using nvm recommended):**
   ```bash
   # Install nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

   # Install Node.js 24.9.0
   nvm install 24.9.0
   nvm use 24.9.0

   # Or use the .nvmrc file
   nvm use
   ```

3. **Enable Corepack for Yarn:**
   ```bash
   corepack enable
   ```

4. **Install Watchman:**
   ```bash
   brew install watchman
   ```

5. **Install CocoaPods:**
   ```bash
   sudo gem install cocoapods
   ```

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd metronome
   ```

2. **Use the correct Node version:**
   ```bash
   nvm use
   ```

3. **Install JavaScript dependencies:**
   ```bash
   corepack enable
   yarn install
   ```

4. **Install iOS dependencies:**
   ```bash
   cd ios
   pod install
   cd ..
   ```

## Running the App on iPhone

### Option 1: Using iOS Simulator

1. **Start the Metro bundler:**
   ```bash
   yarn start
   ```

2. **In a new terminal, run the iOS app:**
   ```bash
   yarn ios
   ```

   Or to specify a specific simulator:
   ```bash
   yarn react-native run-ios --simulator="iPhone 15 Pro"
   ```

3. **The app will automatically open in the iOS Simulator and display "Hello World" on a purple background.**

### Option 2: Running on Physical iPhone Device

1. **Connect your iPhone to your Mac via USB.**

2. **Enable Developer Mode on your iPhone:**
   - Go to Settings > Privacy & Security > Developer Mode
   - Toggle it on and restart your iPhone

3. **Open the Xcode project:**
   ```bash
   open ios/Metronome.xcworkspace
   ```

4. **In Xcode:**
   - Select your iPhone from the device dropdown at the top
   - Click on "Metronome" in the project navigator
   - Go to "Signing & Capabilities" tab
   - Select your Apple Developer Team (or use your personal Apple ID)
   - Ensure "Automatically manage signing" is checked

5. **Start the Metro bundler in a terminal:**
   ```bash
   yarn start
   ```

6. **Build and run from Xcode:**
   - Press the "Play" button (or Cmd + R) in Xcode
   - The app will build and install on your iPhone

7. **If this is your first time:**
   - You may need to trust the developer certificate on your iPhone
   - Go to Settings > General > VPN & Device Management
   - Tap on your developer app certificate
   - Tap "Trust"

### Option 3: Quick Launch (Simulator)

For the fastest way to see the app running:

```bash
# Install dependencies (first time only)
corepack enable
yarn install
cd ios && pod install && cd ..

# Start and run
yarn start & yarn ios
```

## Troubleshooting

### Metro Bundler Port Already in Use
```bash
# Kill the process using port 8081
lsof -ti:8081 | xargs kill -9
yarn start
```

### CocoaPods Issues
```bash
cd ios
rm -rf Pods Podfile.lock
pod cache clean --all
pod install
cd ..
```

### Build Failures
```bash
# Clean build folder
cd ios
xcodebuild clean -workspace Metronome.xcworkspace -scheme Metronome
cd ..
```

### Clear Metro Cache
```bash
yarn start --reset-cache
```

## Project Structure

```
metronome/
├── .nvmrc                 # Node version specification
├── .yarnrc.yml            # Yarn configuration
├── App.tsx                # Main application component
├── index.js               # Entry point
├── package.json           # Dependencies and scripts (Yarn 4.10.3)
├── metro.config.js        # Metro bundler configuration
├── tsconfig.json          # TypeScript configuration
├── eslint.config.mjs      # ESLint configuration
├── babel.config.js        # Babel configuration
├── .github/
│   └── workflows/
│       └── ci.yml         # GitHub Actions CI/CD
└── ios/                   # iOS native code (Swift)
    ├── Podfile            # CocoaPods dependencies
    ├── Metronome/
    │   ├── AppDelegate.swift
    │   └── Info.plist
    └── Metronome.xcodeproj/
```

## Development

### Key Files

- **App.tsx**: Contains the main React component with the purple background and "Hello World" text
- **metro.config.js**: Configuration for Metro bundler (React Native's JavaScript bundler)
- **ios/Podfile**: iOS native dependencies managed by CocoaPods

### Available Scripts

- `yarn start`: Start the Metro bundler
- `yarn ios`: Run the app on iOS simulator
- `yarn android`: Run the app on Android (requires Android setup)
- `yarn lint`: Run ESLint checks
- `yarn lint:fix`: Run ESLint and automatically fix issues
- `yarn type-check`: Run TypeScript type checking
- `yarn validate`: Run both ESLint and TypeScript checks
- `yarn test`: Run tests

### Code Quality

This project uses strict code quality tools:

- **ESLint**: Configured with `eslint-config-love` for strict TypeScript linting
- **TypeScript**: Strict mode enabled with additional checks for maximum type safety
- **Prettier**: Code formatting for consistency

Run all checks before committing:
```bash
yarn validate
```

## Notes

- This project uses **Yarn 4.10.3** as the package manager (managed via Corepack)
- **Node.js 24.9.0** is required (use nvm with the included .nvmrc file)
- This project uses **Metro bundler**, which is the standard and recommended bundler for React Native applications
- React Native does not use Vite; Metro is specifically designed for React Native's architecture
- The iOS native code is written in **Swift** (following React Native 0.77+ best practices)
- The app uses **Hermes engine** for better performance
- **Strict TypeScript** configuration for maximum type safety
- **CI/CD**: GitHub Actions workflow runs linting, type checks, and builds on every PR and push to main/master
- Minimum iOS deployment target: iOS 13.4

## Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Native iOS Setup](https://reactnative.dev/docs/environment-setup?platform=ios)
- [Xcode Documentation](https://developer.apple.com/documentation/xcode)
- [CocoaPods Documentation](https://guides.cocoapods.org/)

## License

See LICENSE file for details.
