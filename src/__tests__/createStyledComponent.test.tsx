import React from 'react';
import { render } from '@testing-library/react-native';
import { createStyledComponent } from '../createStyledComponent';
import type { StyleType } from '../types';
import { View } from 'react-native';

jest.mock('../theme', () => ({
  useTheme: jest.fn().mockReturnValue({ primaryColor: 'blue' }),
}));

const MockComponent: React.FC<{ style?: StyleType }> = ({ style }) => (
  <View testID="mock-component" style={style}>
    Mock Component
  </View>
);

describe('createStyledComponent', () => {
  it('should apply baseStyle when it is an object', () => {
    const baseStyle: StyleType = { backgroundColor: 'red' };
    const StyledComponent = createStyledComponent(MockComponent, baseStyle);

    const { getByTestId } = render(<StyledComponent />);
    expect(getByTestId('mock-component')).toHaveStyle({
      backgroundColor: 'red',
    });
  });

  it('should resolve baseStyle when it is a function', () => {
    const baseStyle = ({ theme }: { theme: any }) => ({
      backgroundColor: theme.primaryColor,
    });
    const StyledComponent = createStyledComponent(MockComponent, baseStyle);

    const { getByTestId } = render(<StyledComponent />);
    expect(getByTestId('mock-component')).toHaveStyle({
      backgroundColor: 'blue',
    });
  });

  it('should merge styles when style prop is provided', () => {
    const baseStyle: StyleType = { backgroundColor: 'red' };
    const StyledComponent = createStyledComponent(MockComponent, baseStyle);

    const { getByTestId } = render(
      <StyledComponent style={{ color: 'white' }} />
    );
    expect(getByTestId('mock-component')).toHaveStyle({
      backgroundColor: 'red',
      color: 'white',
    });
  });
});
