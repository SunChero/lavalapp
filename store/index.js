import {SiteStore} from './SiteStore'
import {PresenceStore} from './PresenceStore'
import {ChatStore} from './ChatStore'
import {observable , computed , action, runInAction} from 'mobx';
import * as Auth from '../api/Auth';

class Store {
    @observable notifications = new Map()
    constructor(){
        this.site = new SiteStore
        this.chat = new ChatStore
        this.presence = new PresenceStore
    }
    async init(){
        await Auth.SignUp()
        await this.site.loadSite();
        await this.chat.loadPeers();
        await this.chat.loadMessages();
        this.presence.SetupPresence()
        global.dsc.event.subscribe(`${global.user.name}-new-message`, msg => {
            this.chat.addMessage(msg)
            let val = this.notifications.get(msg.user) 
            val =  val ? val : 0
            this.notifications.set(msg.user , val +1)
        })
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