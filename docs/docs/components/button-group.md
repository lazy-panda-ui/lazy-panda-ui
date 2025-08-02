---
sidebar_position: 3
---

# ButtonGroup

A ButtonGroup is a set of related buttons that are grouped together.

## Import

```jsx
import { ButtonGroup } from 'lazy-panda-ui';
```

## Usage

```jsx
import { ButtonGroup } from 'lazy-panda-ui';

export default function MyComponent() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const buttons = [
    { label: 'Option 1', onPress: () => setSelectedIndex(0) },
    { label: 'Option 2', onPress: () => setSelectedIndex(1) },
    { label: 'Option 3', onPress: () => setSelectedIndex(2) },
  ];

  return (
    <ButtonGroup
      buttons={buttons}
      selectedIndex={selectedIndex}
      variant="outlined"
      size="medium"
    />
  );
}
```

## Props

### Required Props

| Name | Type | Description |
|------|------|-------------|
| `buttons` | `Array<{ label: string, onPress: () => void, disabled?: boolean }>` | Array of button configurations |

### Optional Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `selectedIndex` | `number` | `undefined` | Index of the selected button |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the buttons |
| `variant` | `'outlined' \| 'contained' \| 'text'` | `'outlined'` | Visual variant of the buttons |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the buttons |
| `disabled` | `boolean` | `false` | Whether to disable all buttons |
| `style` | `ViewStyle` | `undefined` | Additional styles for the container |
| `testID` | `string` | `undefined` | Test ID for testing |

## Variants

### Outlined (Default)
```jsx
<ButtonGroup
  buttons={buttons}
  variant="outlined"
/>
```

### Contained
```jsx
<ButtonGroup
  buttons={buttons}
  variant="contained"
/>
```

### Text
```jsx
<ButtonGroup
  buttons={buttons}
  variant="text"
/>
```

## Sizes

### Small
```jsx
<ButtonGroup
  buttons={buttons}
  size="small"
/>
```

### Medium (Default)
```jsx
<ButtonGroup
  buttons={buttons}
  size="medium"
/>
```

### Large
```jsx
<ButtonGroup
  buttons={buttons}
  size="large"
/>
```

## Direction

### Horizontal (Default)
```jsx
<ButtonGroup
  buttons={buttons}
  direction="horizontal"
/>
```

### Vertical
```jsx
<ButtonGroup
  buttons={buttons}
  direction="vertical"
/>
```

## Disabled State

```jsx
<ButtonGroup
  buttons={buttons}
  disabled={true}
/>
```

## Customization

The ButtonGroup component uses the theme context for styling. You can customize its appearance by modifying your theme:

```jsx
const theme = {
  colors: {
    primary: '#007AFF',
    onPrimary: '#FFFFFF',
    primaryContainer: '#EAF3FF',
    // ... other colors
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },
  // ... other theme properties
};
```
