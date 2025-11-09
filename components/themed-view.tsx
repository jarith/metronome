import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps): React.JSX.Element {
  const backgroundColor = useThemeColor(
    {
      ...(lightColor !== undefined && { light: lightColor }),
      ...(darkColor !== undefined && { dark: darkColor }),
    },
    'background'
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
