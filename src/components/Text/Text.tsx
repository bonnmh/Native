import { enhance, propsToStyle } from '@common/index';
import { AppTheme } from '@themes/type';
import { useTheme } from '@react-navigation/native';
import { FontSizeDefault } from '@themes/fontSize';
import { FontDefault } from '@themes/typography';
import React, { memo, useMemo } from 'react';
import equals from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import {
  StyleProp,
  StyleSheet,
  Text as ReactNativeText,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { TextProps } from './Text.props';
import { textPresets } from './Text.presets';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

const TextComponent = (props: TextProps) => {
  // state
  const theme: AppTheme = useTheme();
  const {
    tx,
    txOptions,
    text,
    children,
    flex,
    fontSize = 'FONT_13',
    fontWeight,
    fontFamily,
    color,
    center,
    textTransform,
    textAlign,
    fontStyle,
    letterSpacing,
    lineHeight,
    colorTheme,
    preset = 'default',
    style: styleOverride = {},
    ...rest
  } = props;
  const [t] = useTranslation();
  const i18nText = useMemo(() => tx && t(tx, txOptions), [tx, txOptions, t]);
  const content = useMemo(
    () => i18nText || text || children,
    [i18nText, text, children],
  );

  const styleComponent = useMemo(
    () =>
      enhance<StyleProp<TextStyle>>([
        fontSize && { fontSize: FontSizeDefault[fontSize] },
        textPresets[preset],
        [
          flex === true && styles.flex,
          fontFamily && { fontFamily: FontDefault[fontFamily] },
          colorTheme && { color: theme.colors[colorTheme] },
          center && { textAlign: 'center' },
          propsToStyle([
            { fontWeight },
            { color },
            { textAlign },
            { textTransform },
            { fontStyle },
            { letterSpacing },
            { lineHeight },
          ]),
          enhance([
            styleOverride]),
        ] as StyleProp<TextStyle>,
      ]),
    [
      flex,
      preset,
      fontSize,
      fontWeight,
      fontFamily,
      color,
      colorTheme,
      theme.colors,
      center,
      textAlign,
      textTransform,
      fontStyle,
      letterSpacing,
      lineHeight,
      styleOverride,
    ],
  );
  // render
  return (
    <ReactNativeText
      allowFontScaling={false}
      {...rest}
      style={[styleComponent]}>
      {content}
    </ReactNativeText>
  );
};
export const Text = memo(TextComponent, equals);
