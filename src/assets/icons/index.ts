/* eslint-disable camelcase */
export const icons = {
  logo: require('./source/logo.png'),
  left: require('./source/left.png'),
  tab_home: require('./source/tab_home.png'),
  tab_search: require('./source/tab_search.png'),
  tab_post: require('./source/tab_post.png'),
  tab_chat: require('./source/tab_chat.png'),
  tab_profile: require('./source/tab_profile.png'),

};

export type IconTypes = keyof typeof icons;
