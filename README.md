# Lazy Panda UI

A simple, customizable UI framework for React Native (Expo compatible).

[![Documentation](https://img.shields.io/badge/documentation-website-blue.svg)](https://lazy-panda-ui.github.io/lazy-panda-ui/)
[![npm version](https://badge.fury.io/js/lazy-panda-ui.svg)](https://badge.fury.io/js/lazy-panda-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Documentation

Visit our [documentation website](https://lazy-panda-ui.github.io/lazy-panda-ui/) for detailed guides and API reference.

## Installation

1. Copy the `src` folder into your project or publish as an npm package.
2. Make sure you have `react`, `react-native`, and `expo` installed in your project.

## Usage

```tsx
import { Button, Card, Text, theme } from 'lazy-panda-ui';

<Card>
  <Text>Hello World</Text>
  <Button title="Click Me" onPress={() => alert('Clicked!')} />
</Card>
```

## Theming

You can customize the `theme.ts` file to change colors, spacing, and border radius globally.

---

This is a starting point. Add more components and utilities as needed!
