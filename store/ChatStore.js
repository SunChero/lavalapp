import {observable, runInAction,  action , computed} from 'mobx';
import { AsyncStorage } from 'react-native';
export class ChatStore {
    @observable peers = []
    @observable messages = new Map()
    loadMessages = async() => {
        let val = await AsyncStorage.getItem('@ICILAVAL:messages'); 
        val = JSON.parse(val)
        this.messages = new Map(val)
    }
    addMessage = (peer , msg) => {
        this.peers.includes(peer) ? null : this.addPeer(peer)
        let msgs =  this.messages.get(peer)
        msgs ? this.messages.set(peer , [...msgs, msg]) : this.messages.set(peer , [...[msg]])
        return this.saveMessages()
    }
    getMessages = (peer , round) =>{
        let msgs  = this.messages.get(peer)
        let len = msgs.length
        return msgs.slice(len - round , len)
    }
    saveMessages = async () => {
        return await AsyncStorage.setItem('@ICILAVAL:messages' , JSON.stringify(Array.from(this.messages.entries()))); 
    }
    loadPeers = async () => {
        let val = await AsyncStorage.getItem('@ICILAVAL:peers'); 
        val ? this.peers = JSON.parse(val) : null
    }
    sendMessage = msg => {
        console.log(`sending msg to ${msg.to}`)
        global.dsc.record.getRecord(`${msg.to}`).whenReady(record =>{
            let messages = record.get('messages');
            console.log(`messages now are ${messages}`)
            messages ? record.set('messages' , [...messages, msg]) : record.set('messages' , [...[msg]]);
            console.log(record.get('messages'))
        })
    }
    addPeer = peer => {
        console.log(`adding peer ${peer}`)
        this.peers.includes(peer) ? null : this.peers.push(peer)
        this.messages.set(peer , [])
        return this.savePeers()
    }
    delPeer = peer => {
        this.peers = this.peers.filter( e => e !== peer)
        this.savePeers()
    }
    savePeers = async ()=>{
        return await AsyncStorage.setItem('@ICILAVAL:peers' , JSON.stringify(this.peers)); 
    }
    
   
}
