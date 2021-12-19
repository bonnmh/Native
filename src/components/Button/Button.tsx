import { enhance } from '@common/index';
import { AppTheme } from '@themes/type';
import React, { memo, useMemo } from 'react';
import equals from 'react-fast-compare';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '@themes/index';

import { Text } from '../Text/Text';

import { stylesView } from './Button.presets';
import { ButtonProps } from './Button.props';
import { Block } from '../Block/Block';

const ButtonComponent = (props: ButtonProps) => {
  // state
  const {
    preset = 'default',
    textPreset = 'default',
    textColor,
    textColorTheme,
    tx,
    text,
    style: styleOverride = {},
    textStyle: textStyleOverride = {},
    children,
    buttonColor,
    buttonColorTheme,
    activeOpacity = 0.5,
    padding = 0,
    disabled = false,
    ...rest
  } = props;
  const theme: AppTheme = useTheme();

  // style
  const viewStyle = useMemo(
    () =>
      enhance<ViewStyle>([
        stylesView[preset],
        {
          backgroundColor: buttonColorTheme
            ? theme.colors[buttonColorTheme]
            : buttonColor,
          padding
        },

        styleOverride as ViewStyle,
      ]),
    [buttonColor, buttonColorTheme, preset, styleOverride, theme.colors, disabled],
  );

  const content = useMemo(
    () =>
      children || (
        <Text
          tx={tx}
          text={text}
          style={textStyleOverride}
          preset={textPreset}
          color={textColor}
          colorTheme={textColorTheme}
        />
      ),
    [
      children,
      tx,
      text,
      textStyleOverride,
      textPreset,
      textColor,
      textColorTheme,
    ],
  );

  // render
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      style={[viewStyle, { opacity: disabled ? 0.5 : 1 }]}
      {...rest}>
      {content}
    </TouchableOpacity>
  );
};
export const Button = memo(ButtonComponent, equals);
