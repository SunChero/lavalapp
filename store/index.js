import {SiteStore} from './SiteStore'
import {PresenceStore} from './PresenceStore'
import {ChatStore} from './ChatStore'
import {UserStore} from './UserStore'
import {observable , computed } from 'mobx';
import * as Auth from '../api/Auth';

class Store {
    @observable notifications = new Map()
    constructor(){
        this.site = new SiteStore
        this.chat = new ChatStore
        this.user = new UserStore
        this.presence = new PresenceStore
    }
    async init(){
       
        await this.user.init()
        await this.site.init()
        await this.chat.loadPeers();
        await this.chat.loadMessages();
        this.presence.SetupPresence()
       
        global.user.subscribe(`messages` , msgs => {
            msgs.map(msg => {
                this.chat.addMessage(msg.from , msg)
                let val = this.notifications.get(msg.from) 
                val =  val ? val : 0
                this.notifications.set(msg.from , val +1)
            })
            global.user.set('messages' , [])
            
        })
        global.user.whenReady(data => this.processOfflineMessages(data));
    }
    processOfflineMessages = (data) =>{
        let messages = data.get('messages')
        messages && data.get('messages').map(msg =>{
                this.chat.addMessage(msg.from , msg)
                let val = this.notifications.get(msg.from) 
                val =  val ? val : 0
                this.notifications.set(msg.from , val +1)
        })
        global.user.set('messages' , [])
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