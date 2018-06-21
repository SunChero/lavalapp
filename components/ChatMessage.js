// @flow
import * as React from "react";
import {StyleSheet , View, TouchableOpacity} from "react-native";
import {StyleGuide, Text, BaseCard, Avatar} from "./index";
import moment from 'moment'
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
    componentDidUpdate(){
       setTimeout(function(){
           const {scroll} = this.props;
           scroll()
       }.bind(this) , 100)
    }
    render(){
        const {navigation } = this.props;
        const {message , user } = this;
        const timestamp = message ? message.timestamp : null;
        return (
           user &&
           <View style={[{ flexDirection: global.user.name === message.user ? 'row-reverse' : 'row' } , styles.box]}>
                 <Avatar size={32} uri={user.picture.thumbnail} style={{margin: 5}}/>
                <TouchableOpacity style={ global.user.name === message.user ? styles.me : styles.message}>
                    <Text style={ global.user.name === message.user ? null : styles.white} >{message.message}</Text>
                    <Text style={[global.user.name === message.user ? null : styles.white ,styles.time]}> {moment(timestamp, "X").fromNow()}
                    </Text>
                </TouchableOpacity>
            </View>
          
        );
    }
}

const styles = StyleSheet.create({
    time: {
        fontSize: 11,
       
    },
    box : {
        padding: 5
    },
    message: {
        padding: 12,
        width: '80%',
        backgroundColor: '#4A148C',
        borderRadius: 10,
        color : 'white',
        marginBottom: 2,
        justifyContent: 'flex-end'
    },
    me : {
        width: '80%',
        backgroundColor: '#F5F5F5',
        marginBottom: 2,
        padding: 12,
        borderRadius: 10,
        marginTop:10
    },
    white : {
        color : 'white'
    }
});

