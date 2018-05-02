import {observable, runInAction,  action , computed , createTransformer} from 'mobx';

class OnlineStore {
    
    @observable users = [];
    @action Setup = () =>{
        return global.dsc.presence.getAll(online =>{
            runInAction(()=>{
                this.users = online;
                this.users.push(global.username) //add current user to the online users
            })
        })
    }
    @action subscribe(){
        return global.dsc.presence.subscribe(this.updateUsers)
    }
   
    updateUsers = (username , online) =>{
        if(online === true) this.users.push(username)
        else this.users = this.users.filter( e => e !== username)
        console.log(this.users)
    }   
}
export const onlinestore = new OnlineStore();