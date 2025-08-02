---
sidebar_position: 1
---

# Installation

Get started with Lazy Panda UI in your React Native project.

## Requirements

### Peer Dependencies

The following packages are required to be installed in your project:

| Package | Version |
|---------|---------|
| `react` | >= 16.8.0 |
| `react-native` | >= 0.63.0 |
| `react-native-reanimated` | >= 2.0.0 |
| `@react-native-community/hooks` | >= 3.0.0 |

## Installation

### Using NPM Registry

```bash
# Install peer dependencies
npm install react-native-reanimated @react-native-community/hooks

# Install Lazy Panda UI
npm install lazy-panda-ui
```

Or using Yarn:

```bash
# Install peer dependencies
yarn add react-native-reanimated @react-native-community/hooks

# Install Lazy Panda UI
yarn add lazy-panda-ui
```

### Using GitHub Registry

1. First, authenticate with GitHub Packages. Create a `.npmrc` file in your project root:

```bash
@lazy-panda-ui:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Replace `YOUR_GITHUB_TOKEN` with a GitHub personal access token that has the `read:packages` scope.

2. Install the package:

```bash
# Install peer dependencies
npm install react-native-reanimated @react-native-community/hooks

# Install from GitHub Packages
npm install @lazy-panda-ui/lazy-panda-ui
```

Or using Yarn:

```bash
# Install peer dependencies
yarn add react-native-reanimated @react-native-community/hooks

# Install from GitHub Packages
yarn add @lazy-panda-ui/lazy-panda-ui
```

## Setup

### 1. Configure Reanimated

Add Reanimated's Babel plugin to your `babel.config.js`:

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

### 2. Setup Theme Provider

Wrap your app with the `ThemeProvider`:

```jsx
import { ThemeProvider } from 'lazy-panda-ui';
// If installed from GitHub Packages, use:
// import { ThemeProvider } from '@lazy-panda-ui/lazy-panda-ui';

export default function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### 3. Additional Setup for iOS

For iOS, you need to install the pods:

```bash
cd ios
pod install
cd ..
```

## Troubleshooting

### Common Issues

1. **Reanimated Configuration**
   
   If you see errors related to Reanimated, ensure that:
   - The Reanimated plugin is correctly configured in `babel.config.js`
   - You've cleaned and rebuilt your project:
     ```bash
     # For iOS
     cd ios && pod install && cd ..
     npx react-native start --reset-cache
     
     # For Android
     cd android && ./gradlew clean && cd ..
     ```

2. **GitHub Packages Access**

   If you see authentication errors with GitHub Packages:
   - Verify your GitHub token has the `read:packages` scope
   - Ensure your `.npmrc` file is correctly configured
   - Try logging in manually: `npm login --registry=https://npm.pkg.github.com`

3. **iOS Build Issues**

   If you encounter iOS build issues:
   - Clean the build folder: `xcodebuild clean`
   - Remove pods and reinstall: 
     ```bash
     cd ios
     pod deintegrate
     pod install
     cd ..
     ```

## Next Steps

- Check out the [Usage Guide](usage) to learn how to use components
- Browse the [Components](../components/button) documentation
- Learn about [Theming](../customization/theming)
