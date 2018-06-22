import { Dimensions } from 'react-native';
import React from 'react';
import {Icon} from '../components/index'
const tintColor = '#283355';
export const SITE_URL = 'http://192.168.183.121:3000/_web/export/api'
export const NEWS_PAGE_URL = 'http://192.168.183.121:3000/_web/newsPage?link='
export const USER_URL = 'https://randomuser.me/api/?nat=CA'
export const DS_URL = 'ws://192.168.183.121:6020/deepstream'

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
export const tabBarOptions = {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: false,
  headerEnabled : false,
  showLabel: true,
  activeTintColor: "black",
  inactiveTintColor : '#B0BEC5',
  labelStyle: {
    fontSize: 12,
    fontWeight: '100'
  },
  style: {
    borderTopWidth: 1,
    borderTopColor: 'white' ,
    backgroundColor : "white",
  },
}
export const NavigationOptions = ({ navigation }) => ({
  tabBarIcon: ({ focused }) => {
    const { routeName } = navigation.state;
    let iconName;
    let iconClass;
    switch (routeName) {
      case 'news':
        iconName = Platform.OS === 'ios' ? `ios-flame${focused ? '' : '-outline'}` : 'md-flame';
        iconClass ='ionicons'
        break;
      case 'explore':
        iconName = Platform.OS === 'ios' ? `ios-compass${focused ? '' : '-outline'}` : 'md-link';
        iconClass ='ionicons'
        break;
      case 'Signalement':
        iconName = Platform.OS === 'ios' ? `ios-megaphone${focused ? '' : '-outline'}` : 'md-options';
        iconClass ='ionicons'
          break;
      case 'profile':
          iconName = Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options';
          iconClass = 'ionicons'
          break;
      case 'calendar':
          iconName = Platform.OS === 'ios' ? `ios-calendar${focused ? '' : '-outline'}` : 'md-options';
          iconClass ='ionicons'
          break;
      case 'inbox':
          iconName =  Platform.OS === 'ios' ? `ios-chatbubbles${focused ? '' : '-outline'}` : 'md-flame';
        //  global.waitingMessages ?  iconName : iconName = 'ios-alert'
          iconClass ='ionicons'
          break;
      case 'Filter':
         iconName = Platform.OS === 'ios' ? `ios-funnel${focused ? '' : '-outline'}` : 'md-options';
         iconClass ='ionicons'
    }
    return (
      <Icon  containerStyle={{ backgroundColor: 'transparent'}}  type={iconClass} name={iconName} size={28}  color={focused ? "black" : "#B0BEC5"}  />
    );
  }
})