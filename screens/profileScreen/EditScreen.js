import React, { Component } from 'react';
import { Text, ScrollView,  View, StyleSheet , Modal} from 'react-native';
import { Constants } from 'expo';
import { NavigationBar,KeyboardSpacer } from '../../components';
import {Button , Avatar , Badge} from 'react-native-elements'
import CameraRollPicker from 'react-native-camera-roll-picker';
import {observable} from "mobx";
import {observer} from "mobx-react/native";
import {UPLOAD_URL , AVATAR_URL} from '../../api/constants'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
@observer
export default class EditScreen extends Component {
@observable avatar = ""
static defaultProps = {
  user : {
    "gender": "female",
    "name": {
    "title": "mrs",
    "first": "yael",
    "last": "obdam"
    },
    "location": {
    "street": "826 bokstraat",
    "city": "nieuwkoop",
    "state": "friesland",
    }
    },
    "email": "yael.obdam@example.com",
    "login": {
    "username": "whiteduck842",
    },
    "id": "",
    "picture": {
      "large": "https://randomuser.me/api/portraits/women/54.jpg",
      "medium": "https://randomuser.me/api/portraits/med/women/54.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/women/54.jpg"
    }
}
  state = {
      first : '',
      last : '',
      email : "",
      showCamera : false,
      description : ''
  }
  onPress = () => {
    const name = {
          first : this.state.first,
          last : this.state.last
    }
    global.user.set("name" , name)
    global.user.set('login.username' , this.state.username)
    global.user.set("email" , this.state.email)
    global.user.set("description" , this.state.description)
    this.saveAvatar()
    this.props.navigation.navigate('main')
  
  }
  componentDidMount(){
      const name = global.user.get("name")
      const login = global.user.get("login")
      const username = login.username
      const email = global.user.get("email")
      const first = name.first;
      const last = name.last;
      const description = global.user.get("description");
      this.avatar = global.user.get("picture").thumbnail;
      this.setState({...{last, first, email, username, description}})
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
      <View style={{flex :1}}>
      <ScrollView style={styles.container}>
        <View>
        <NavigationBar {...{navigation , title , back , rightAction : saveRightAction}}/>
        <View style={{margin: 10 , flex : 1}}>
            <View  style={{flex: 1 , alignItems : 'center' , alignContent: 'center' , backgroundColor: 'white'}}>
                <Avatar rounded  source={{ uri: this.avatar }} width={60} />
                <Badge containerStyle={{ backgroundColor: '#283355'}}  onPress={() => {this.setState({"showCamera" : true})}}>
                        <Text style={{color : 'white'}}>update</Text>
                </Badge>
            </View>
            <View style={{flex: 1 ,padding :10, alignItems : 'center' , alignContent: 'center' , backgroundColor: 'white'}}>
                <FormLabel>First Name</FormLabel>
                <FormInput value={this.state.first} onChangeText={first => this.setState({first})} placeholder="First Name"/>
                <FormLabel>Last Name</FormLabel>
                <FormInput value={this.state.last} onChangeText={last => this.setState({last})} placeholder="Last Name"/>
                <FormLabel>username</FormLabel>
                <FormInput value={this.state.username} onChangeText={username => this.setState({username})} placeholder="username"/>
                <FormLabel>Email</FormLabel>
                <FormInput value={this.state.email} onChangeText={email => this.setState({email})} placeholder="Email@email.com"/>
                <FormLabel>About</FormLabel>
                <FormInput value={this.state.description} onChangeText={description => this.setState({description})} placeholder="im who im"/>
            </View>
            
        </View>
        <Modal   animationType={'slide'}     transparent={false}  visible={this.state.showCamera}  onRequestClose={() => {
            this.setState("showCamera" ,  false);
              }}
                >
                <NavigationBar {...{rightAction, title }}/>
                <CameraRollPicker   maximum={10}  imagesPerRow={4}   callback={this.setAvatar}   />
        </Modal>
        </View>
        
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