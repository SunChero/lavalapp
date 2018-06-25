// @flow
import * as React from "react";
import {StyleSheet , View, TouchableOpacity} from "react-native";
import { Text} from "./index";
import moment from 'moment'
export default class ChatMessage extends React.PureComponent{
  
    render(){
        const {message} = this.props;
        const timestamp = message ? message.timestamp : null;
        return (
           <View style={[{ flexDirection: global.user.name === message.from ? 'row-reverse' : 'row' } , styles.box]}>
                <TouchableOpacity style={ global.user.name === message.from ? styles.me : styles.message}>
                    <Text style={ global.user.name === message.from ? null : styles.white} >{message.message}</Text>
                    <Text style={[global.user.name === message.from ? null : styles.white ,styles.time]}> {moment(timestamp, "X").fromNow()}
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
        width: '90%',
        backgroundColor: '#4A148C',
        borderRadius: 10,
        color : 'white',
        marginBottom: 2,
        justifyContent: 'flex-end'
    },
    me : {
        width: '90%',
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

