import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider, useTheme } from '../theme';
import type { Theme } from '../types';
import { View, Text } from 'react-native';

const customTheme: Theme = {
  primaryColor: 'red',
};

describe('useTheme', () => {
  it('should return the default theme value', () => {
    const TestComponent = () => {
      const theme = useTheme();
      return (
        <View testID="theme">
          <Text>{JSON.stringify(theme)}</Text>
        </View>
      );
    };

    render(<TestComponent />);
    expect(screen.getByTestId('theme')).toHaveTextContent('{}');
  });

  it('ThemeProvider should update the theme context value', () => {
    const TestComponent = () => {
      const theme = useTheme();
      return (
        <View testID="theme">
          <Text>{JSON.stringify(theme)}</Text>
        </View>
      );
    };

    render(
      <ThemeProvider value={customTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent(
      JSON.stringify(customTheme)
    );
  });
});
