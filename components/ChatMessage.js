// @flow
import * as React from "react";
import {StyleSheet , View} from "react-native";
import {StyleGuide, Text, BaseCard, Avatar} from "./index";
import {observer , inject} from 'mobx-react/native'
import {observable} from 'mobx'
@observer
export default class ChatMessage extends React.Component{
    @observable user = null;
    @observable message = null;
   
    constructor(props){
        super(props)
        const {messageRef} = this.props;
        const id = messageRef ? messageRef : this.props.navigation.state.params.messageRef;
        this.messageRef = global.dsc.record.getRecord(id);
        this.messageRef.subscribe(this.setMessage.bind(this))
    }
    componentWillUnmount(){
        this.messageRef.discard()
    }
    setMessage(data){
        console.log(data)
        this.message = data
         global.dsc.record.snapshot(data.user , (error, data)=> {
            this.user = data
         })
    }
    render(){
        const {navigation } = this.props;
        const {message , user } = this;
        console.log(message)
        const timestamp = message ? message.timestamp : null;
        return (
           user &&
           <View style={{ flexDirection: 'row' }}>
                <View style={styles.user}>
                   <Avatar size={48} uri={user.picture} />
                </View>
                <BaseCard style={styles.baseCard}>
                    <Text>{message.message}</Text>
                </BaseCard>
            </View>
          
        );
    }
}

const styles = StyleSheet.create({
    baseCard: {
        minHeight: 48,
        justifyContent: "center",
        flex: 1
    },
    user: {
        width: 80,
        justifyContent: "flex-end"
    }
});

