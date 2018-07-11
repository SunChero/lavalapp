import React, { Component } from 'react';
import {  View, Text,  StyleSheet ,TouchableOpacity} from 'react-native';
import {Observer ,  inject} from 'mobx-react/native'
import {Handle} from './index';
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
@inject('store')
export default class NotificationCounter extends Component {
   state = {
       counter : 0
   }
   componentDidMount = () => {
       this.setState({
           counter : this.props.store.notifications.get(this.props.item)
       })
   }
   delete = () => {
       this.props.store.chat.delPeer(this.props.item)

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
                    <Icon color="white" reverse reverseColor="black" name="ios-trash-outline" raised={true} size={16} type="ionicon"  onPress={this.delete}/>
                    {
                        this.props.store.notifications.get(item) > 0 && 
                        <View style={styles.IconBadge}>
                            <Text style={{color: 'white'}}>{this.props.store.notifications.get(item)}</Text>
                        </View>
                    }
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
        padding: 10,
        backgroundColor: "#f5f5f5" ,
        margin: 4,
        // shadowOpacity: 0.3,
        // shadowOffset: {
        // width: 0,
        // height: 2,
        // }
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
        right: 5,
        top: 5,
        minWidth:20,
        height:20,
        borderRadius:15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF0000'
      }
});