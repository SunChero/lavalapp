import { Dimensions } from 'react-native';
const tintColor = '#283355';

export const Colors =  {
  tintColor,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: tintColor,
  warningText: '#fff',
  noticeBackground: tintColor,
  noticeText: '#fff',
};


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const window = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};