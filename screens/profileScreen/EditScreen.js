import React, { Component } from 'react';
import { Text, StatusBar, TextInput, View, StyleSheet , Modal} from 'react-native';
import { Constants } from 'expo';
import { NavigationBar } from '../../components';
import {Button , Avatar , Badge} from 'react-native-elements'
import CameraRollPicker from 'react-native-camera-roll-picker';
import {observable} from "mobx";
import {observer} from "mobx-react/native";
const UPLOAD_URL = "http://192.168.183.121:3000/upload"
const AVATAR_URL = "http://192.168.183.121:3000/"
@observer
export default class EditScreen extends Component {
@observable avatar = ""
  state = {
      first : '',
      last : '',
      email : "",
      showCamera : false,
  }
  onPress = () => {
    const name = {
          first : this.state.first,
          last : this.state.last
    }
    global.user.set("name" , name)
    global.user.set('login.username' , this.state.username)
    global.user.set("email" , this.state.email)
    this.saveAvatar()
    this.props.navigation.goBack()
  }
  componentDidMount(){
      const name = global.user.get("name")
      const login = global.user.get("login")
      const username = login.username
      const email = global.user.get("email")
      const first = name.first;
      const last = name.last;
      this.avatar = global.user.get("picture").thumbnail;
      this.setState({...{last, first, email, username}})
  }
  saveAvatar = () =>{
      const picture = global.user.get("picture");
      console.log(picture)
      const originalAvatar = picture.thumbnail
      const id = global.user.get('id');
      if(this.avatar !==  originalAvatar ) {
            const data = new FormData();
            data.append('avatar', {
                uri: this.avatar,
                type: 'image/jpeg', // or photo.type
                name: id + '-avatar'
            });
            fetch(UPLOAD_URL, {
                method: 'post',
                body: data
            }).then(res => {
                picture.thumbnail = AVATAR_URL + id +'-avatar.jpeg'
                global.user.set("picture", picture) 
            });
      }
  }
  setAvatar = (avatar) => {
    const uri = avatar[0].uri
    this.avatar = uri;
    this.setState({"showCamera" : false})
  }
  render() {
    const {navigation}  = this.props;
    const title = "User details"
    const back = "Settings"
    const rightAction = {icon : "md-checkmark-circle-outline" , type:"ionicons" ,  onPress : () => { this.setState("showCamera" , false)}}
    const saveRightAction = {text : "save"  ,onPress : this.onPress}
    return (
      <View style={styles.container}>
        <NavigationBar {...{navigation , title , back , rightAction : saveRightAction}}/>
        {
            this.state.message &&  
            <View style={styles.header}>
                <Text style={styles.description}>
                   {this.state.message} 
                </Text>
            </View>
        }
        <View style={{margin: 10 , flex : 1}}>
            <View  style={{flex: 1 , alignItems : 'center' , alignContent: 'center' , backgroundColor: 'white'}}>
                <Avatar rounded  source={{ uri: this.avatar }} width={60} />
                <Badge containerStyle={{ backgroundColor: '#283355'}}  onPress={() => {this.setState({"showCamera" : true})}}>
                        <Text style={{color : 'white'}}>update</Text>
                </Badge>
            </View>
            <Text style={{fontSize : 12 ,marginLeft:5 , marginBottom: 5}}>Firstname </Text>
            <TextInput
            style={styles.input}
            value={this.state.first}
            onChangeText={first => this.setState({first})}
            placeholder="First Name"
            />
            <Text style={{fontSize : 12 ,marginLeft:5 , marginBottom: 5}}>Lastname </Text>
            <TextInput
            style={styles.input}
            value={this.state.last}
            onChangeText={last => this.setState({last})}
            placeholder="Last Name"
            />
            <Text style={{fontSize : 12 ,marginLeft:5 , marginBottom: 5}}>Username </Text>
            <TextInput
            style={styles.input}
            value={this.state.username}
            onChangeText={username => this.setState({username})}
            placeholder="UserName"
            />
            <Text style={{fontSize : 12 ,marginLeft:5, marginBottom: 5 }}>Email </Text>
            <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            placeholder="email@example.com"
            />
        </View>
        
       
        <Modal   animationType={'slide'}     transparent={false}  visible={this.state.showCamera}  onRequestClose={() => {
                            this.setState("showCamera" ,  false);
                        }}
                >
                <NavigationBar {...{rightAction, title }}/>
                <CameraRollPicker   maximum={10}  imagesPerRow={4}   callback={this.setAvatar}   />
        </Modal>
      </View>
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