import {
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
  type StyleProp,
} from 'react-native';

import type { Theme } from '.';

export type StyleType = ViewStyle | TextStyle | ImageStyle;

export type BaseStyleFunction<P, S = StyleType> = ({
  theme,
  props,
}: {
  theme: Theme;
  props: P;
}) => S;

export type PropsWithStyle<P> = P & { style?: StyleProp<StyleType> };

export type BaseStyle<P, S = StyleType> = StyleType | BaseStyleFunction<P, S>;

export type StyledComponentProps<
  StylingProps extends object,
  ComponentProps extends object,
> = PropsWithStyle<StylingProps & ComponentProps>;
