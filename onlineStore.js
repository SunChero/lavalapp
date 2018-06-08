import {observable, runInAction,  action , computed , createTransformer} from 'mobx';
class OnlineStore {
    @observable channels =[]
    @observable me = {}
    @observable users = [];
    @observable unreadMessages = []

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
        console.log(`subscribing  on ${global.user.name}-new-message`)
        global.dsc.event.subscribe(`${global.user.name}-new-message`, this.onMessage)
    }
    SetupChannels = () =>{
        const  chanStr = `${global.user.name}-open-channels`
        this.channelsRef = global.dsc.record.getList(chanStr);
        this.channelsRef.subscribe((entries) => this.channels = entries)
    }
    createChannel = (user) => {
        const  chanStr = `${user}`
        if( ! this.channels.includes(chanStr))
        {
            let rc =  global.dsc.record.getRecord(chanStr)
            this.channelsRef.addEntry(rc.name)
            this.unreadMessages[chanStr] = 0
        }
    }
    notifyUnreadMessage = (user) => {
        this.unreadMessages[user] = this.unreadMessages[user] + 1
    }
  
    onMessage = (user) => {
    console.log(this.unreadMessages)
      
       this.createChannel(user)
       this.notifyUnreadMessage(user)
    }
   
}
export const onlinestore = new OnlineStore();