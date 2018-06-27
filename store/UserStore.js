import {observable, runInAction,  action , computed} from 'mobx';
import createDeepstream from 'deepstream.io-client-js';
import {USER_URL , DS_URL} from '../api/constants'
import {AsyncStorage} from 'react-native'
const DEEP_OPTIONS = {
    reconnectIntervalIncrement: 10000,
    maxReconnectInterval: 30000,
    maxReconnectAttempts: Infinity,
    heartbeatInterval: 30000
  }
export class UserStore {
    @observable data = {}

    init = async() => {
        let data  = await AsyncStorage.getItem('@ICILAVAL:user'); 
        this.data = JSON.parse(data)
        if(this.data === null  || this.data === 'undefined'){
            this.data = await this.createUser()
        }
        await this.loginUser()
    }
    get = param => {
        return this.data[param]
       // return global.user.get(param)
    }
    set = (param, value) => {
        this.data[param] = value
        console.log(global.user.get(param))
        global.user.set(param , value)
        console.log(global.user.get(param))
        this.saveUser()
    }
    loginUser = async () =>{
        global.dsc = createDeepstream(DS_URL , {
            reconnectIntervalIncrement: 10000,
            maxReconnectInterval: 30000,
            maxReconnectAttempts: Infinity,
            heartbeatInterval: 30000
          }).login({
          username : this.data.id ,
          password :  'invalid'
        });
        global.dsc.on('error' , (error) => {})
        global.dsc.on('connectionStateChanged' , (status) => {
           // global.ConnectionStatus = status
        })
        global.user = global.dsc.record.getRecord(this.data.id);
    }
    saveUser = async () => {
         await AsyncStorage.setItem('@ICILAVAL:user' , JSON.stringify(this.data)); 
    }
    createUser = async () =>{
           const response =  await fetch(USER_URL,{
             method: 'post',
             body: null
           })
           const user = await response.json()
           await AsyncStorage.setItem('@ICILAVAL:user', JSON.stringify( user ));
           await AsyncStorage.setItem('@ICILAVAL:token', user.token);  
           return user;
    }
}
