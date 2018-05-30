import {observable, runInAction,  action , computed , createTransformer} from 'mobx';

class OnlineStore {
    
    @observable channels =[]
    @observable me = {}
    @observable users = [];
   // @observable onlineusers = [];
   
    
    @action SetupPresence = () =>{
        global.dsc.presence.getAll(online =>{
            this.users = online;
          //  this.onlineusers = online;
            this.users.push(global.user.name)
         //   this.onlineusers.push(global.user.name)
        })
        global.dsc.presence.subscribe( (username , online) =>{
            if(online === true){
                this.users.push(username)
              //  this.onlineusers.push(username)
             }
             else this.users = this.users.filter( e => e !== username)
        })
       
    }
    SetupChannels = () =>{
        const  chanStr = `${global.user.name}-open-channels`
        this.channelsRef = global.dsc.record.getList(chanStr);
        this.channelsRef.subscribe((entries) => this.channels = entries)
    }
    createChannel = (user) => {
        const  chanStr = `${user}`
        console.log(chanStr)
        const chs = this.channelsRef.getEntries()
       let rc =  global.dsc.record.getRecord(chanStr)
       if(! chs.includes(rc.name) )  this.channelsRef.addEntry(rc.name)
      //  this.requestChannel(user)
    }
    requestChannel = (user) =>{
        console.log(this.channelsRef)
        const  chanStr = `${user}-open-channels`
        let rc =  global.dsc.record.getRecord(chanStr).set({
            chanRef : '/channel/' + [user, global.user.name].sort().join('::'),
            status : 'waiting'
        })
        let c = global.dsc.record.getList(chanStr)
       // const chs = this.channelsRef.getEntries()
        //if(! chs.includes(rc.id) )  
         c.addEntry(rc)
        //when ready check if channel already exist
        
    }
   
   
}
export const onlinestore = new OnlineStore();