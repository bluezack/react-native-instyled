import React, { type ComponentType } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
  type StyleProp,
  type ViewProps,
  type TextProps,
  type ImageProps,
  type TouchableOpacityProps,
  type ScrollViewProps,
  type TextInputProps,
} from 'react-native';
import { useTheme } from './theme';
import type { BaseStyle, StyleType, StyledComponentProps } from './types';

const mergeStyles = (
  baseStyle: StyleType,
  additionalStyle?: StyleProp<StyleType>
): StyleProp<StyleType> => {
  if (Array.isArray(additionalStyle)) {
    return [baseStyle, ...additionalStyle];
  }
  return { ...baseStyle, ...(additionalStyle as any) };
};

const createStyledComponent = <
  StylingProps extends object,
  ComponentProps extends Object = {},
>(
  Component: ComponentType<ComponentProps>,
  baseStyle: BaseStyle<StylingProps>
) => {
  return React.memo(
    ({
      style,
      ...rest
    }: StyledComponentProps<StylingProps, ComponentProps>) => {
      const theme = useTheme();

      const resolvedBaseStyle =
        typeof baseStyle === 'function'
          ? baseStyle({ theme, props: rest as StylingProps })
          : baseStyle;

      const mergedStyle = mergeStyles(resolvedBaseStyle, style);

      return <Component style={mergedStyle} {...(rest as any)} />;
    }
  );
};

const instyled = {
  View: <StylingProps extends Object>(
    style: BaseStyle<StylingProps, ViewStyle>
  ) => createStyledComponent<StylingProps, ViewProps>(View, style),
  Text: <StylingProps extends Object>(
    style: BaseStyle<StylingProps, TextStyle>
  ) => createStyledComponent<StylingProps, TextProps>(Text, style),
  Image: <StylingProps extends Object>(
    style: BaseStyle<StylingProps, ImageStyle>
  ) => createStyledComponent<StylingProps, ImageProps>(Image, style),
  TouchableOpacity: <StylingProps extends Object>(
    style: BaseStyle<StylingProps, ViewStyle>
  ) =>
    createStyledComponent<StylingProps, TouchableOpacityProps>(
      TouchableOpacity,
      style
    ),
  ScrollView: <StylingProps extends Object>(
    style: BaseStyle<StylingProps, ViewStyle>
  ) => createStyledComponent<StylingProps, ScrollViewProps>(ScrollView, style),
  TextInput: <StylingProps extends Object>(
    style: BaseStyle<StylingProps, TextStyle>
  ) => createStyledComponent<StylingProps, TextInputProps>(TextInput, style),
  apply:
    <StylingProps extends object>(Component: ComponentType) =>
    (style: BaseStyle<StylingProps>) =>
      createStyledComponent<StylingProps>(Component, style),
};

export default instyled;
