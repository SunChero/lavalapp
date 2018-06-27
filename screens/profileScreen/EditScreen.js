import React, { Component } from 'react';
import { Text, ScrollView,  View, StyleSheet , Modal} from 'react-native';
import { Constants } from 'expo';
import { NavigationBar,KeyboardSpacer ,EmptyShell} from '../../components';
import {Button , Avatar , Badge} from 'react-native-elements'
import CameraRollPicker from 'react-native-camera-roll-picker';
import {observable} from "mobx";
import {observer , inject} from "mobx-react/native";
import {UPLOAD_URL , AVATAR_URL} from '../../api/constants'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
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
      <EmptyShell {...{title , navigation ,back , rightAction : saveRightAction}}>
                <View style={{flex :1}}>
      <ScrollView style={styles.container}>
        <View>
        <View style={{margin: 10 , flex : 1}}>
            <View  style={{flex: 1 , alignItems : 'center' , alignContent: 'center' , backgroundColor: 'white'}}>
                <Avatar rounded  source={{ uri: user.get("picture").thumbnail }} width={60} />
                <Badge containerStyle={{ backgroundColor: '#283355'}}  onPress={() => {this.setState({"showCamera" : true})}}>
                        <Text style={{color : 'white'}}>update</Text>
                </Badge>
            </View>
            <View style={{flex: 1 ,padding :10, alignItems : 'center' , alignContent: 'center' , backgroundColor: 'white'}}>
                <FormLabel>First Name</FormLabel>
                <FormInput value={user.get("name").first} onChangeText={ first => user.set("name" ,{ "first" : first, "last" : user.get("name").last } )}/>
                <FormLabel>Last Name</FormLabel>
                <FormInput value={user.get("name").last} onChangeText={ last => user.set("name" ,{ "last" : last , "first" : user.get("name").first } )}/>
                <FormLabel>username</FormLabel>
                <FormInput value={user.get("login").username} onChangeText={ username => user.set("login" , {"username" : username})}/>
                <FormLabel>Email</FormLabel>
                <FormInput value={user.get("email")} onChangeText={email => user.set("email" , email)}/>
                <FormLabel>About</FormLabel>
                <FormInput value={user.get("description")} onChangeText={description =>  user.set("description" , description)}/>
            </View>
            
        </View>
        <Modal   animationType={'slide'}     transparent={false}  visible={this.state.showCamera} 
         onRequestClose={() => {   this.setState("showCamera" ,  false); }}
                >
                <NavigationBar {...{rightAction, title }}/>
                <CameraRollPicker   maximum={10}  imagesPerRow={4}   callback={this.setAvatar}   />
        </Modal>
        </View>
        
      </ScrollView>
      <KeyboardSpacer />
      </View>
            </EmptyShell>
     
     
    );
  }
  
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 20 + Constants.statusBarHeight,
    padding: 20,
    backgroundColor: '#336699',
  },
  description: {
    fontSize: 14,
    color: 'white',
  },
  input: {
    margin: 5,
    marginBottom: 5,
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 1,
    borderColor: '#ededed',
    borderWidth: 1,
    fontSize: 16,
  },
});