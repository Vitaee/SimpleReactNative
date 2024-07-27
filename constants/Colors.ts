/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const commonColor = {
  commonWhite: '#FFFFFF',
  commonBlack: '#000000',
  activeColor: '#FF6B6B',
  deactiveColor: '#FF6B6B80',
  boxActiveColor: '#FF6B6B20', 
};

export const Colors = {
  light: {
    themeColor: '#F5F5F5', 
    primaryText: '#333333',
    secondaryText: '#666666', 
    accentColor: '#FF6B6B', 
    background: '#FFFFFF', 
    borderColor: '#E0E0E0', 
    ...commonColor,
  },
  dark: {
    themeColor: '#1E1E1E', 
    primaryText: '#E0E0E0', 
    secondaryText: '#B0B0B0', 
    accentColor: '#FF6B6B', 
    background: '#121212', 
    borderColor: '#222121', 
    ...commonColor,
  },
};