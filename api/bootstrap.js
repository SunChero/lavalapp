import {Facebook} from 'expo'
import {AsyncStorage} from 'react-native'
import createDeepstream from 'deepstream.io-client-js';
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
  global.user = global.dsc.record.getRecord(user)
 // global.username = 'user' + user_id
}
export const SignUp = async () => {
  let user = await AsyncStorage.getItem('@ICILAVAL:user'); 
  console.log(user)
 // if(user === null){
    console.log('user not FOUND')
    user = await SignUpAnonymous()
 // }
  await LoginWithDeepStream()
}

