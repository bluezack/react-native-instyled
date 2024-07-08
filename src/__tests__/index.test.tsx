// @ts-nocheck
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import instyled, { ThemeProvider, useTheme } from '../index';
import type { Theme } from '../types';

const mockTheme: Theme = {
  colors: {
    primary: 'blue',
    secondary: 'green',
    background: 'white',
    text: 'black',
    placeholderText: 'red',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  typography: {
    fontSize: {
      small: 12,
      medium: 16,
      large: 20,
    },
  },
};

describe('instyled components', () => {
  // Existing tests...

  it('renders a styled TouchableOpacity component', () => {
    const StyledButton = instyled.TouchableOpacity({
      backgroundColor: 'yellow',
    });
    const { getByTestId } = render(
      <StyledButton testID="styled-button">
        <Text>Press me</Text>
      </StyledButton>
    );

    const button = getByTestId('styled-button');
    expect(button).toHaveStyle({ backgroundColor: 'yellow' });
  });

  it('renders a styled TextInput component', () => {
    const StyledInput = instyled.TextInput({
      borderColor: 'gray',
      borderWidth: 1,
    });
    const { getByTestId } = render(
      <StyledInput testID="styled-input" placeholder="Enter text" />
    );

    const input = getByTestId('styled-input');
    expect(input).toHaveStyle({ borderColor: 'gray', borderWidth: 1 });
  });

  it('applies theme to a styled component', () => {
    const ThemedText = instyled.Text(({ theme }) => ({
      color: theme.colors.primary,
      fontSize: theme.typography.fontSize.medium,
    }));

    const { getByTestId } = render(
      <ThemeProvider value={mockTheme}>
        <ThemedText testID="themed-text">Themed Text</ThemedText>
      </ThemeProvider>
    );

    const themedText = getByTestId('themed-text');
    expect(themedText).toHaveStyle({ color: 'blue', fontSize: 16 });
  });

  it('updates style when props change', () => {
    const DynamicBox = instyled.View<{ isActive: boolean }>(
      ({ props: { isActive } }) => ({
        backgroundColor: isActive ? 'green' : 'red',
        padding: 10,
      })
    );

    const { getByTestId, rerender } = render(
      <DynamicBox testID="dynamic-box" isActive={false} />
    );

    let box = getByTestId('dynamic-box');
    expect(box).toHaveStyle({ backgroundColor: 'red', padding: 10 });

    rerender(<DynamicBox testID="dynamic-box" isActive={true} />);

    box = getByTestId('dynamic-box');
    expect(box).toHaveStyle({ backgroundColor: 'green', padding: 10 });
  });

  it('handles event props correctly', () => {
    const onPressMock = jest.fn();
    const StyledButton = instyled.TouchableOpacity({ padding: 10 });

    const { getByTestId } = render(
      <StyledButton testID="styled-button" onPress={onPressMock}>
        <Text>Press me</Text>
      </StyledButton>
    );

    const button = getByTestId('styled-button');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('uses useTheme hook correctly', () => {
    const ThemedComponent = () => {
      const theme = useTheme();
      return (
        <Text testID="themed-text" style={{ color: theme.colors.secondary }}>
          Themed Text
        </Text>
      );
    };

    const { getByTestId } = render(
      <ThemeProvider value={mockTheme}>
        <ThemedComponent />
      </ThemeProvider>
    );

    const themedText = getByTestId('themed-text');
    expect(themedText).toHaveStyle({ color: 'green' });
  });

  it('handles nested styled components', () => {
    const OuterBox = instyled.View({ padding: 10 });
    const InnerBox = instyled.View({ margin: 5 });

    const { getByTestId } = render(
      <OuterBox testID="outer-box">
        <InnerBox testID="inner-box" />
      </OuterBox>
    );

    const outerBox = getByTestId('outer-box');
    const innerBox = getByTestId('inner-box');

    expect(outerBox).toHaveStyle({ padding: 10 });
    expect(innerBox).toHaveStyle({ margin: 5 });
  });
});
