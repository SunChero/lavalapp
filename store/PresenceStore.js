import {observable, runInAction,  action , computed} from 'mobx';

export class PresenceStore {
    @observable users = [];

    @action SetupPresence = () =>{
        global.dsc.presence.getAll(online =>{
            this.users = online;
            this.users.push(global.user.name)
        })
        global.dsc.presence.subscribe( (username , online) =>{
            if(online === true){
                this.users.push(username)
            }
            else this.users = this.users.filter( e => e !== username)
        })
       
    }
}
