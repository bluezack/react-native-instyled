# React Native Instyled

React Native Instyled is a simple and flexible styling library for React Native applications.

## Features

- Easy-to-use API for creating styled components
- Full TypeScript support
- Theming system with context-based theme provider
- Support for all basic React Native components (View, Text, TouchableOpacity, etc.)
- Dynamic styling based on props and theme
- Performance optimized

## Installation

```bash
npm install react-native-instyled
# or
yarn add react-native-instyled
```

## Basic Usage

Here's a quick example of how to use React Native Instyled:

```typescript
import React from 'react';
import instyled, { ThemeProvider } from 'react-native-instyled';

// Define your theme
const theme = {
  colors: {
    primary: '#007AFF',
    background: '#F2F2F7',
    text: '#000000',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};

// Create styled components
const Container = instyled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  padding: theme.spacing.medium,
}));

const Title = instyled.Text(({ theme }) => ({
  fontSize: 20,
  fontWeight: 'bold',
  color: theme.colors.text,
  marginBottom: theme.spacing.small,
}));

const Button = instyled.TouchableOpacity(({ theme }) => ({
  backgroundColor: theme.colors.primary,
  padding: theme.spacing.small,
  borderRadius: 5,
}));

const ButtonText = instyled.Text({
  color: 'white',
  textAlign: 'center',
});

// Use your styled components
const App = () => (
  <ThemeProvider value={theme}>
    <Container>
      <Title>Welcome to React Native instyled!</Title>
      <Button>
        <ButtonText>Press me</ButtonText>
      </Button>
    </Container>
  </ThemeProvider>
);

export default App;
```

## API Reference

### `instyled`

The main export of the library. It contains methods for styling each React Native component.

- `instyled.View`
- `instyled.Text`
- `instyled.TouchableOpacity`
- `instyled.TextInput`
- `instyled.ScrollView`
- `instyled.Image`

Each method takes a style object or a function that returns a style object:

```typescript
const StyledComponent = instyled.View({ backgroundColor: 'red' });
// or
const ThemedComponent = instyled.View(({ theme }) => ({
  backgroundColor: theme.colors.primary,
}));
```

### `ThemeProvider`

A React context provider for your theme:

```typescript
<ThemeProvider value={theme}>
  {/* Your app components */}
</ThemeProvider>
```

### `useTheme`

A hook to access the current theme in any component:

```typescript
const MyComponent = () => {
  const theme = useTheme();
  return <View style={{ backgroundColor: theme.colors.background }} />;
};
```

## Advanced Usage

### Dynamic Styling

You can create components with styles that change based on props:

```typescript
const DynamicButton = instyled.TouchableOpacity<{ isActive: boolean }>(
  ({ props: {isActive}, theme }) => ({
    backgroundColor: isActive ? theme.colors.primary : theme.colors.secondary,
    padding: theme.spacing.medium,
  })
);

// Usage
<DynamicButton isActive={true} />
```

### Extending Styles

You can extend the styles of a styled component:

```typescript
const BaseButton = instyled.TouchableOpacity({ padding: 10 });
const PrimaryButton = instyled(BaseButton)({ backgroundColor: 'blue' });
```

## TypeScript Support

React Native instyled is written in TypeScript and provides full type support. You can extend the default theme type for better IntelliSense and type checking:

```typescript
declare module 'react-native-instyled' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      placeholderText: string;
    };
    spacing: {
      small: number;
      medium: number;
      large: number;
    };
    typography: {
      fontSize: {
        small: number;
        medium: number;
        large: number;
      };
    };
  }
}
```

Place this code in a declaration file (e.g., `types.d.ts`) in your project. This approach allows you to extend or override the default theme type provided by the library.

Now you get full type support in your styled components:

```typescript
import 'react-native-insylted';

const StyledComponent = instyled.View(({ theme }) => ({
  backgroundColor: theme.colors.primary,
  padding: theme.spacing.medium,
  fontSize: theme.typography.fontSize.small,
}));
```

This method provides type safety and autocompletion for your custom theme properties while still maintaining compatibility with the library's default theme.

## Contributing

We welcome contributions to React Native instyled! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

React Native instyled is MIT licensed. See [LICENSE](LICENSE) for details.
