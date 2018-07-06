import React, { Component } from 'react';
import { Text, ScrollView,  View, StyleSheet , Modal,TextInput} from 'react-native';
import { Constants } from 'expo';
import { NavigationBar,KeyboardSpacer } from '../../components';
import {Button , Avatar , Badge} from 'react-native-elements'
import CameraRollPicker from 'react-native-camera-roll-picker';
import {observable} from "mobx";
import {observer , inject} from "mobx-react/native";
import {UPLOAD_URL , AVATAR_URL} from '../../api/constants'
import { FormLabel,  FormValidationMessage } from 'react-native-elements'
@inject('store')
@observer
export default class EditScreen extends Component {
@observable avatar = ""
 state  = {
   showCamera : false,
 }
  onPress = () => {
    this.props.navigation.navigate('main')
  }
  
  saveAvatar = (uri) =>{
    let {user} = this.props.store;
    let id = user.get("id")
            const data = new FormData();
            data.append('avatar', {
                uri: uri,
                type: 'image/jpeg', // or photo.type
                name: id + '-avatar'
            });
            fetch(UPLOAD_URL, {
                method: 'post',
                body: data
            }).then(res => {
                thumbnail = AVATAR_URL + id +'-avatar.jpeg'
                user.set("picture", {thumbnail : thumbnail}) 
            });
      
  }
  setAvatar = (avatar) => {
    const uri = avatar[0].uri
    this.setState({"showCamera" : false})
    this.saveAvatar(uri)
  }
  render() {
    const {navigation}  = this.props;
    let {user} = this.props.store   
    const title = "User details"
    const back = "Settings"
    const rightAction = {icon : "md-checkmark-circle-outline" , type:"ionicons" ,  onPress : () => { this.setState("showCamera" , false)}}
    const saveRightAction = {text : "save"  ,onPress : this.onPress}
    return (
                <View style={{flex :1 , backgroundColor: 'white'}}>
                  <NavigationBar {...{title , navigation, rightAction : saveRightAction, back}} />
                     <ScrollView containerStyle={styles.container}>
                        <View  style={{flex: 1 , alignItems : 'center' , alignContent: 'center' }}>
                            <Avatar rounded  source={{ uri: user.get("picture").thumbnail }} width={60} />
                            <Badge containerStyle={{ backgroundColor: '#283355'}}  onPress={() => {this.setState({"showCamera" : true})}}>
                                    <Text style={{color : 'white'}}>update</Text>
                            </Badge>
                        </View>
                        <View style={{ alignItems : 'center' , alignContent: 'center' , alignContent:"center"}}>
                            <FormLabel>First Name</FormLabel>
                            <TextInput value={user.get("name").first} 
                            onChangeText={ first => user.set("name" ,{ "first" : first, "last" : user.get("name").last } )}
                            style={styles.input}
                            />
                            <FormLabel>Last Name</FormLabel>
                            <TextInput 
                            value={user.get("name").last} onChangeText={ last => user.set("name" ,{ "last" : last , "first" : user.get("name").first } )}
                             style={styles.input}
                             />
                            <FormLabel>username</FormLabel>
                            <TextInput 
                            value={user.get("login").username} onChangeText={ username => user.set("login" , {"username" : username})}
                            style={styles.input}
                            />
                            <FormLabel>Email</FormLabel>
                            <TextInput value={user.get("email")} onChangeText={email => user.set("email" , email)}
                            style={styles.input}
                            />
                            <FormLabel>About</FormLabel>
                            <TextInput value={user.get("description")} onChangeText={description =>  user.set("description" , description)}
                            style={styles.input}
                            />
                        </View>
                        
                    <Modal   animationType={'slide'}     transparent={false}  visible={this.state.showCamera} 
                    onRequestClose={() => {   this.setState("showCamera" ,  false); }}
                            >
                            <NavigationBar {...{rightAction, title }}/>
                            <CameraRollPicker   maximum={10}  imagesPerRow={4}   callback={this.setAvatar}   />
                    </Modal>
                  </ScrollView>
                  <KeyboardSpacer />
                </View>
               
        
     
     
    );
  }
  
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    margin: 10
  },
  header: {
    paddingTop: 20 + Constants.statusBarHeight,
    padding: 20
  },
  description: {
    fontSize: 14,
    color: 'white',
  },
  input: {
    width:'100%',
    margin: 5,
    marginBottom: 5,
    height: 45,
    fontSize: 22,
    fontWeight : '900',
    textAlign: 'center'
  },
});