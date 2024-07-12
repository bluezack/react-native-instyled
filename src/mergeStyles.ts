import type { StyleProp } from 'react-native';
import type { StyleType } from './types';

export const mergeStyles = (
  baseStyle: StyleType,
  additionalStyle?: StyleProp<StyleType>
): StyleProp<StyleType> => {
  if (Array.isArray(additionalStyle)) {
    return [baseStyle, ...additionalStyle];
  }
  return { ...baseStyle, ...(additionalStyle as any) };
};
