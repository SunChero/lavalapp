import {Facebook} from 'expo'
import React from 'react';
import {AsyncStorage} from 'react-native'
import createDeepstream from 'deepstream.io-client-js';
import { NavigationActions } from 'react-navigation';
import {Icon} from '../components/index'
const GET_USER_URL = 'http://192.168.183.145:3000/register'
const DS_URL = "ws://192.168.183.145:6020/deepstream";

export const SignUpWithFacebook = async() => {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync('200996303851059', {
            permissions: ['public_profile', 'email', 'user_friends'],
          });
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?fields=name,email,address,birthday,first_name,last_name&access_token=${token}`);
          const js = await response.json();
          const srv = await fetch('http://45.77.147.98/__-__register', {
               method: 'post',
               body: JSON.stringify(js)
           });
          const srvres = await srv.json()
          this.setState({
            'facebook' : js
          })
          console.log(srvres)
        }
      
}
export const SignUpAnonymous = async () =>{
    const response =  await fetch(GET_USER_URL,{
      method: 'post',
      body: null
    })
    const user = await response.json()
    console.log('user is now :' + JSON.stringify(user))
    await AsyncStorage.setItem('@ICILAVAL:user', user.id);
    await AsyncStorage.setItem('@ICILAVAL:token', user.token);  
    return user;
}
export const LoginWithDeepStream = async () =>{
  const user = await AsyncStorage.getItem('@ICILAVAL:user');
  const token = await AsyncStorage.getItem('@ICILAVAL:token');  
  global.dsc = createDeepstream(DS_URL).login({
    username : user ,
    password :  token
  });
  global.dsc.on('error' , (error) => {})
  global.dsc.on('connectionStateChanged' , (error , event , topic) => {})
  global.user = global.dsc.record.getRecord(user);
  global.user.whenReady(record => global.userObj = record.get())

 // global.username = 'user' + user_id
}
export const SignUp = async () => {
  let user = await AsyncStorage.getItem('@ICILAVAL:user'); 
  console.log(user)
 //if(user === null){
    console.log('user not FOUND')
    user = await SignUpAnonymous()
 //}
  await LoginWithDeepStream()
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
