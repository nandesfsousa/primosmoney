/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from 'react';
import {
  ActivityIndicator as DefaultActivityIndicator,
  Text as DefaultText, 
  View as DefaultView, 
  TextInput as DefaultInput, 
  Image as DefaultImage,
  Button as DefaultButton,
  TouchableOpacity as DefaultTouchableOpacity,
  ScrollView as DefaultScrollView,
} from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
};

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type ActivityIndicatorProps = ThemeProps & DefaultActivityIndicator['props'];
export type ScrollViewProps = ThemeProps & DefaultScrollView['props'];
export type InputProps = ThemeProps & DefaultInput['props'];
export type ImageProps = ThemeProps & DefaultImage['props'];
export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ButtonProps = ThemeProps & DefaultButton['props'];
export type TouchableOpacityProps = ThemeProps & DefaultTouchableOpacity['props'];

export function Input(props: InputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');
  return (
    <DefaultInput
      placeholderTextColor={color}
      style={[{ color: color}, style]}
      underlineColorAndroid={color}
      {...otherProps}
    />
  )
};
export function Image(props: ImageProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const widthLogo = Layout.window.width-195;
  return <DefaultImage style={[{width:widthLogo, height:widthLogo-10, resizeMode: 'contain'}, style]} {...otherProps}/>
};
export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};
export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[style]} {...otherProps} />;
};

export function ScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultScrollView style={[style]} {...otherProps} />;
};
export function Button(props:ButtonProps){
  const { lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultButton {...otherProps} />;
};
export function TouchableOpacity(props: TouchableOpacityProps){
  const { lightColor, darkColor, ...otherProps } = props;

  return <DefaultTouchableOpacity {...otherProps} />;
};
export function ActivityIndicator(props: ActivityIndicatorProps){
  const { lightColor, darkColor, ...otherProps } = props;

  return <DefaultActivityIndicator {...otherProps} />;
}