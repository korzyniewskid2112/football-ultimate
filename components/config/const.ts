import { DefaultTheme, useTheme } from '@react-navigation/native';

export const LightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(255,255,255,1)',
    background: 'rgba(255,255,255,1)',
    card: 'rgba(27, 58, 81, 1)',
    text: 'rgba(255, 255, 255, 1)',
    border: 'rgba(206, 206, 206, 1)',
  },
};

export const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(255,255,255,1)',
    background: 'rgba(255,255,255,1)',
    card: 'rgba(27, 58, 81, 1)',
    text: 'rgba(255, 255, 255, 1)',
    border: 'rgba(206, 206, 206, 1)',
  },
};

const getColors = () => {
  const { dark, colors } = useTheme();
  if (dark)
    return {
      ...colors,
      main: 'rgba(27, 58, 81, 1)',
      textBlack: 'rgba(37, 37, 37, 1)',
      textWhite: 'rgba(255, 255, 255, 1)',
      iconBlack: 'rgba(37, 37, 37, 1)',
      iconWhite: 'rgba(255, 255, 255, 1)',
      tabBarIconActive: 'rgba(27, 58, 81, 1)',
      tabBarIcon: 'rgba(136, 134, 137, 1)',
    }
  return {
    ...colors,
    main: 'rgba(27, 58, 81, 1)',
    textBlack: 'rgba(37, 37, 37, 1)',
    textWhite: 'rgba(255, 255, 255, 1)',
    iconBlack: 'rgba(37, 37, 37, 1)',
    iconWhite: 'rgba(255, 255, 255, 1)',
    tabBarIconActive: 'rgba(27, 58, 81, 1)',
    tabBarIcon: 'rgba(136, 134, 137, 1)',
  }
}

export const fonts = {
  size: {
    megaSmall: 10,
    extraSmall: 12,
    small: 14,
    regular: 16,
    large: 18,
    extraLarge: 20,
    huge: 24,
  },
  family: {
    roboto: {
      thin: 'Roboto_100Thin',
      light: 'Roboto_300Light',
      regular: 'Roboto_400Regular',
      medium: 'Roboto_500Medium',
      bold: 'Roboto_700Bold',
      black: 'Roboto_900Black',
    },
  }
}


export default getColors;

