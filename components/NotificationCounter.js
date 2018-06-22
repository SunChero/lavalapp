import React, { Component } from 'react';
import {  View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Observer ,  inject} from 'mobx-react/native'
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
        const show = this.props.store.notifications.get(item) > 0 ? true : false 
        return <Observer>{
            () => <TouchableOpacity style={styles.header} onPress={() => this.onPress(item)}>
                    <View style={styles.user} >
                        <Handle {...{user : item}} />
                    </View>
                    {this.props.store.notifications.get(item) > 0 && <View style={styles.IconBadge}><Text style={{color: 'white'}}>{this.props.store.notifications.get(item)}</Text></View>}
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
    },
    IconBadge: {
      
        position: 'absolute',
        right: 10,

        minWidth:20,
        height:20,
        borderRadius:15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF0000'
      }
});