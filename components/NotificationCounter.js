import React, { Component } from 'react';
import {  View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Observer , observer,  inject} from 'mobx-react/native'
import {observable} from 'mobx'
import {Handle} from './index';

@inject('store')
export default class NotificationCounter extends Component {
   state = {
       counter : 0
   }
   componentDidMount = () => {
       console.log('mounted')
       this.setState({
           counter : this.props.store.notifications.get(this.props.item)
       })
   }
    onPress = (user) => {
        this.props.navigation.navigate("chat" , {user})
        this.props.store.notifications.set(this.props.item, 0)
    }
    render() {
        const {item} = this.props;
        return <Observer>{
            () => <TouchableOpacity style={styles.header} onPress={() => this.onPress(item)}>
                    <View style={styles.user} >
                        <Handle {...{user : item}} />
                    </View>
                    <Text type="footnote">{this.props.store.notifications.get(item)}</Text>
                </TouchableOpacity>
                }
        </Observer>;
            
        
  }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    user: {
        flexDirection: "row",
        alignItems: "stretch"
    },
    username: {
        justifyContent: "space-between",
        marginLeft: 5
    },
    headline: {
        lineHeight: 17
    },
    footnote: {
        lineHeight: 13
    }
});