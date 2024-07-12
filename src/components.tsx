import { type ComponentType } from 'react';
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
  type ViewProps,
  type TextProps,
  type ImageProps,
  type TouchableOpacityProps,
  type ScrollViewProps,
  type TextInputProps,
} from 'react-native';
import type { BaseStyle } from './types';
import { createStyledComponent } from './createStyledComponent';

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
