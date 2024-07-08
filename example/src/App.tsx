import React, { useState } from 'react';
import { Alert } from 'react-native';
import instyled, { ThemeProvider, type Theme } from 'react-native-instyled';

const AppTheme: Theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#F2F2F7',
    text: '#000000',
    placeholderText: '#C7C7CC',
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

export default function App() {
  const [inputValue, setInputValue] = useState('');

  return (
    <ThemeProvider value={AppTheme}>
      <Container>
        <Title>instyled Example</Title>
        <Input
          placeholder="Enter something..."
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Button
          onPress={() => Alert.alert('Pressed!', `You entered: ${inputValue}`)}
        >
          <ButtonText>Submit</ButtonText>
        </Button>
      </Container>
    </ThemeProvider>
  );
}

const Container = instyled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  padding: theme.spacing.medium,
  alignItems: 'center',
  justifyContent: 'center',
}));

const Title = instyled.Text(({ theme }) => ({
  fontSize: theme.typography.fontSize.large,
  color: theme.colors.text,
  marginBottom: theme.spacing.large,
}));

const Input = instyled.TextInput(({ theme }) => ({
  width: '100%',
  height: 40,
  borderColor: theme.colors.primary,
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: theme.spacing.small,
  marginBottom: theme.spacing.medium,
  fontSize: theme.typography.fontSize.medium,
  color: theme.colors.text,
}));

const Button = instyled.TouchableOpacity(({ theme }) => ({
  backgroundColor: theme.colors.primary,
  paddingVertical: theme.spacing.small,
  paddingHorizontal: theme.spacing.medium,
  borderRadius: 5,
}));

const ButtonText = instyled.Text(({ theme }) => ({
  color: 'white',
  fontSize: theme.typography.fontSize.medium,
}));
