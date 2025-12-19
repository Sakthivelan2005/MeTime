import { useThemeColor } from '@/hooks/use-theme-color';
import { Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway';
import { useFonts } from '@expo-google-fonts/raleway/useFonts';
import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Raleway_400Regular',
    color: '#000'
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontFamily: 'Raleway_700Bold',
    color:'#000'
  },
  subtitle: {
    fontSize: 20,
     color:'#000',
    fontWeight: 'bold',
    fontFamily: 'Raleway_400Regular'
    
  },
  link: {
    textDecorationLine: 'underline',
    color: '#ff8c7aff',
    fontFamily: 'Raleway_400Regular'
  },
});
