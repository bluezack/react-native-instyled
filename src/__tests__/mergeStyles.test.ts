import { mergeStyles } from '../mergeStyles';
import type { StyleType } from '../types';

describe('mergeStyles', () => {
  it('should merge baseStyle and additionalStyle when additionalStyle is an object', () => {
    const baseStyle: StyleType = { backgroundColor: 'red' };
    const additionalStyle: StyleType = { color: 'blue', margin: 10 };

    const result = mergeStyles(baseStyle, additionalStyle);

    expect(result).toEqual({ ...baseStyle, ...additionalStyle });
  });

  it('should merge baseStyle and additionalStyle when additionalStyle is an array', () => {
    const baseStyle: StyleType = { backgroundColor: 'red' };
    const additionalStyle: StyleType[] = [{ color: 'blue' }, { margin: 10 }];

    const result = mergeStyles(baseStyle, additionalStyle);

    expect(result).toEqual([baseStyle, ...additionalStyle]);
  });

  it('should return baseStyle when additionalStyle is undefined', () => {
    const baseStyle: StyleType = { backgroundColor: 'red' };
    const additionalStyle = undefined;

    const result = mergeStyles(baseStyle, additionalStyle);

    expect(result).toEqual(baseStyle);
  });

  it('should return baseStyle when additionalStyle is null', () => {
    const baseStyle: StyleType = { backgroundColor: 'red' };
    const additionalStyle = null;

    const result = mergeStyles(baseStyle, additionalStyle);

    expect(result).toEqual(baseStyle);
  });
});
