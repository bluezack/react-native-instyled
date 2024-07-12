import type { ComponentType } from 'react';
import type { BaseStyle, StyledComponentProps } from './types';
import React from 'react';
import { useTheme } from './theme';
import { mergeStyles } from './mergeStyles';

export const createStyledComponent = <
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
