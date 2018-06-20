import {SiteStore} from './SiteStore'
import {PresenceStore} from './PresenceStore'
import {ChatStore} from './ChatStore'
import {observable , computed , action, runInAction} from 'mobx';
class Store {
    @observable notifications = new Map()
    constructor(){
        this.site = new SiteStore
        this.chat = new ChatStore
        this.presence = new PresenceStore
        
    }
    init = () =>{
        console.log(`subscribing on ${global.user.name}-new-message`)
        global.dsc.event.subscribe(`${global.user.name}-new-message`, this.onMessageReceived)
        console.log(this.notifications)
    }
    @action onMessageReceived = (sender) =>{
        this.chat.createConversation(sender)
        let val = this.notifications.get(sender) 
        val =  val ? val : 0
        this.notifications.set(sender , val +1)
        console.log(this.notifications)
    }
    @computed get totalNotifications(){
    let total = 0
      this.notifications.forEach( val => {
         total = total + val
      })
      console.log(total)
      return total
    }
   

}

export const store = new Store();