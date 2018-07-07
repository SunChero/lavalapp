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
        this.data = {...defaultUser , ...this.data }
       // console.log(this.data)
        await this.loginUser()
    }

    get = param => {
        return this.data[param]
    }
    set = (param, value) => {
        this.data[param] = value
        global.user.set(param , value)
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
        global.dsc.on('connectionStateChanged' , (status) => { // global.ConnectionStatus = status 
          })
        global.user = global.dsc.record.getRecord(this.data.id);
        global.user.set(this.data)
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
           return user;
    }
}
const defaultUser = {
        "gender": "female",
        "name": {
        "title": "ms",
        "first": "márcia",
        "last": "monteiro"
        },
        "location": {
        "street": "8390 rua são sebastiao ",
        "city": "brasília",
        "state": "sergipe",
        "postcode": 72257,
        "coordinates": {
        "latitude": "-68.9030",
        "longitude": "167.8611"
        },
        "timezone": {
        "offset": "+3:00",
        "description": "Baghdad, Riyadh, Moscow, St. Petersburg"
        }
        },
        "email": "márcia.monteiro@example.com",
        "login": {
        "username": "silversnake561",
        },
        "dob": {
        "date": "1948-03-21T14:38:25Z",
        "age": 70
        },
        "registered": {
        "date": "2015-01-20T22:58:23Z",
        "age": 3
        },
        "phone": "(73) 3069-9590",
        "cell": "(76) 8307-8330",
        "picture": {
        "large": "https://randomuser.me/api/portraits/women/12.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/12.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/12.jpg"
        },
        "sync" : [],
        "notifications" : false,
        "pushToken" : null
}