/* eslint-disable camelcase */
export const images = {
  bg_wallpaper: require('./source/bg.png'),
  default: require('./source/default.png'),
  rectangle: require('./source/rectangle.png'),
  logo: require('./source/logo.png'),
};

export type ImageTypes = keyof typeof images;
