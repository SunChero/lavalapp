import {observable, runInAction,  action , computed , createTransformer} from 'mobx';

class OnlineStore {
    @observable users = [];
    @action Setup = () =>{
        return global.dsc.presence.getAll(online =>{
            runInAction(()=>{
                this.users = online;
            })
        })
    }
    @action subscribe(){

        return global.dsc.presence.subscribe(this.updateUsers)
    }
   
    updateUsers = (username , online) =>{
        console.log('updating store' + online)
        if(online === true) this.users.push(username)
        else this.users = this.users.filter( e => e !== username)
        console.log(this.users)
    }   
}
export const onlinestore = new OnlineStore();