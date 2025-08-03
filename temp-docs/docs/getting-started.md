---
id: getting-started
slug: /
sidebar_position: 1
---

# Getting Started with Lazy Panda UI

Welcome to Lazy Panda UI! This React Native UI component library is designed to make building beautiful mobile applications easier and faster.

## Installation

To add Lazy Panda UI to your React Native project:

```bash
npm install @lazy-panda-ui/lazy-panda-ui
# or
yarn add @lazy-panda-ui/lazy-panda-ui
```

## Quick Start

1. Import the components you need:

```jsx
import { Button, Card } from '@lazy-panda-ui/lazy-panda-ui';
```

2. Use them in your React Native application:

```jsx
import React from 'react';
import { View } from 'react-native';
import { Button, Card } from '@lazy-panda-ui/lazy-panda-ui';

function App() {
  return (
    <View>
      <Card title="Welcome">
        <Button onPress={() => console.log('Hello!')}>
          Click me
        </Button>
      </Card>
    </View>
  );
}

export default App;
```

## Basic Components

The library includes essential components such as:

- `Button`: Customizable button component
- `Card`: Container component with optional header and footer
- `Input`: Text input with built-in styling
- `Typography`: Text components with predefined styles

Each component is designed to be:
- Easy to use
- Customizable
- Performance optimized
- Cross-platform compatible
