import {observable, runInAction,  action , computed , createTransformer} from 'mobx';

class OnlineStore {
    self = this
    @observable users = [];
    
    @action Setup = () =>{
        return global.dsc.presence.getAll(online =>{
            console.log(online)
            runInAction(()=>{
                online.map(user =>{
                    this.updateUsers(user , "online")
                })
                this.updateUsers(global.user.id , "online")
               // this.users = online;
              //  this.users.push(global.user.name) //add current user to the online users
            })
        })
    }
    @action subscribe(){
        return global.dsc.presence.subscribe(this.updateUsers)
    }
   
    updateUsers = (username , online) =>{
        runInAction(() => {
            if(online === true){
                console.log('Adding ' + username )
                global.dsc.record.getRecord(username).whenReady( record =>{
                    self.users.push(record.get())
                })
            }
            else this.users = this.users.filter( e => e.id !== username)
            console.log(this.users)
        })
        
    }   
}
export const onlinestore = new OnlineStore();