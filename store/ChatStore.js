import {observable, runInAction,  action , computed} from 'mobx';
import { AsyncStorage } from 'react-native';
export class ChatStore {
   // @observable conversations = new Map()
    @observable peers = []
    @observable messages = new Map()
    loadMessages = async() => {
        let val = await AsyncStorage.getItem('@ICILAVAL:messages'); 
        val = JSON.parse(val)
        this.messages = new Map(val)
        console.log('done')
    }
    addMessage = (msg) => {
        let peer = msg.user
        console.log(msg)
        this.peers.includes(peer) ? null : this.addPeer(peer)
        let msgs =  this.messages.get(peer)
        msgs ? this.messages.set(peer , [...msgs, msg]) : this.messages.set(peer , [...[msg]])
        console.log(this.messages)
        return this.saveMessages()
    }
    saveMessages = async () => {
        console.log('savin')
        return await AsyncStorage.setItem('@ICILAVAL:messages' , JSON.stringify(Array.from(this.messages.entries()))); 
    }
    loadPeers = async () => {
        let val = await AsyncStorage.getItem('@ICILAVAL:peers'); 
        val ? this.peers = JSON.parse(val) : null
    }
    addPeer = peer => {
        this.peers.push(peer)
        return this.savePeers()
    }
    delPeer = peer => {
        this.peers = this.peers.filter( e => e !== peer)
    }
    savePeers = async ()=>{
        return await AsyncStorage.setItem('@ICILAVAL:peers' , JSON.stringify(this.peers)); 
    }
    
   
}
