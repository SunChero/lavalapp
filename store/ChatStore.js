import {observable, runInAction,  action , computed} from 'mobx';
export class ChatStore {
    @observable conversations =[]
    loadConversations = () =>{
        const  convStr = `${global.user.name}-open-conversations`
        this.conversationsRef = global.dsc.record.getList(convStr);
        this.conversationsRef.subscribe((entries) => this.conversations = entries)
    }
    createConversation = (user) => {
        const  convStr = `${user}`
        if( ! this.conversations.includes(convStr))
        {
            let rc =  global.dsc.record.getRecord(convStr)
            this.conversationsRef.addEntry(rc.name)
     
        }
    }
    
   
}
