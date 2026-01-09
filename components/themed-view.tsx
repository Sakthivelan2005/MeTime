import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, ViewProps, useColorScheme } from 'react-native';

interface ThemedViewProps extends ViewProps {
  variant?: 'default' | 'surface';
}

export const ThemedView = React.forwardRef<View, ThemedViewProps>(
  ({ style, variant = 'default', ...props }, ref) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

    const backgroundColor = variant === 'surface' ? colors.surface : colors.background;

    return <View ref={ref} style={[{ backgroundColor }, style]} {...props} />;
  }
);

ThemedView.displayName = 'ThemedView';
