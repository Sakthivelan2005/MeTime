import { useThemeColor } from '@/hooks/use-theme-color';
import { Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway';
import { useFonts } from '@expo-google-fonts/raleway/useFonts';
import { StyleSheet, Text, useWindowDimensions, type TextProps } from 'react-native';

const {width, height} = useWindowDimensions();

//Calculating font Size as per the mobile screen's height and width.
const px32 = 30%height;
const px24 = 22%height;
const px18 = 16%height;
const px16 = 14%height;
const px14 = 12%height;

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | '32px' | '24px' | '18px' | '16px' | '14px' | 'link';
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
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Raleway_400Regular   
  });

  if (!fontsLoaded) return null;

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === '32px' ? styles.px32 : undefined,
        type === '24px' ? styles.px24 : undefined,
        type === '18px' ? styles.px18 : undefined,
        type === '16px' ? styles.px16 : undefined,
        type === '14px' ? styles.px14 : undefined,
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
  px32: {
    fontFamily: 'Raleway_700Bold',
    color:'#000',
    fontSize: px32
  },
  px24: {
    fontSize: px24,
     color:'#000',
    fontFamily: 'Raleway_600SemiBold'
    
  },
  px18: {
    fontFamily: 'Raleway_500Medium',
    fontSize: px18,
  },
  px16: {
    fontFamily: 'Raleway_500Medium',
    fontSize: px16,
  },
  px14: {
    fontFamily: 'Raleway_500Medium',
    fontSize: px14,
  },
  link: {
    textDecorationLine: 'underline',
    color: '#ff8c7aff',
    fontFamily: 'Raleway_400Regular'
  },
});
