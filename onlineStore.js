import {observable, runInAction,  action , computed , createTransformer} from 'mobx';

class OnlineStore {
    @observable users = [];
    @action Setup = () =>{
        return global.dsc.presence.getAll(online =>{
            this.users = online;
            this.users.push(global.user.name)
        })
    }
    @action subscribe(){
        return global.dsc.presence.subscribe(this.updateUsers)
    }
    updateUsers = (username , online) =>{
        console.log(username +'is now '+ online)
            if(online === true){
               this.users.push(username)
            }
            else this.users = this.users.filter( e => e !== username)
    }   
}
export const onlinestore = new OnlineStore();