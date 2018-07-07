import React, { Component } from 'react';
import { Text, ScrollView,  View, StyleSheet , Modal,TextInput , TouchableOpacity,Image , Picker} from 'react-native';
import { Constants } from 'expo';
import { NavigationBar,KeyboardSpacer ,ActionSheet} from '../../components';
import CameraRollPicker from 'react-native-camera-roll-picker';
import {UPLOAD_URL , AVATAR_URL} from '../../api/constants'
import Ripple from 'react-native-material-ripple';

export default class EditScreen extends Component {
 state  = {
   showCamera : false,
   imageUrl : this.props.navigation.state.params.user.get("picture").thumbnail,
   city : this.props.navigation.state.params.user.get("city"),
   language : this.props.navigation.state.params.user.get("language")
 }
  onPress = () => {
    this.props.navigation.navigate('main')
  }
  saveAvatar = (uri) =>{
    let {user} = this.props.navigation.state.params
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
                this.setState({"imageUrl" : thumbnail})
            });
      
  }
  setAvatar = (avatar) => {
    const uri = avatar[0].uri
    this.setState({"showCamera" : false})
    this.setState({"imageUrl" : ""})
    this.saveAvatar(uri)
  }
  setCity = (city) =>{
    this.setState({"city" : city})
    this.props.navigation.state.params.user.set("city" , city)
  }
  setLanguage = (language) =>{
    this.setState({"language" : language})
    this.props.navigation.state.params.user.set("language" , language)
  }
  render() {
    const {navigation}  = this.props;
    const {secteurs , user } = navigation.state.params
    const title = "User details"
    const back = "Settings"
    const rightAction = {icon : "md-checkmark-circle-outline" , type:"ionicons" ,  onPress : () => { this.setState("showCamera" , false)}}
    const saveRightAction = {text : "save"  ,onPress : this.onPress}
    return (
                <View style={{flex :1 , backgroundColor: 'white'}}>
                  <NavigationBar {...{title , navigation, rightAction : saveRightAction, back}} />
                     <ScrollView containerStyle={styles.container}>
                        <View style={{flex: 1 , flexDirection : 'row', padding: 5}}>
                          <TouchableOpacity  style={{flex : 1 , width: 60 , height: 60 , borderRadius: 30,overflow : 'hidden' , backgroundColor: 'grey', marginRight: 10}} 
                             onPress={() => {this.setState({"showCamera" : true})}}>
                              <Image  source={{uri :  this.state.imageUrl}} style={{flex : 1, width: null , height : null , resizeMode : 'cover'}}/>
                          </TouchableOpacity>
                          <View style={{flex :4 }}>
                              <TextInput multiline value={user.get("description")} onChangeText={description =>  user.set("description" , description)}
                              placeHolder="About Me"
                              style={{fontSize : 14, backgroundColor : '#f9f9f9' , height: 60, color : 'black', borderRadius: '2'}}
                              
                              />
                          </View>
                        </View>
                        <View style={{ alignItems : 'center' , alignContent: 'center' , alignContent:"center"}}>
                          <View style={[styles.input]}>
                            <Text >First Name</Text>
                            <TextInput value={user.get("name").first} 
                            onChangeText={ first => user.set("name" ,{ "first" : first, "last" : user.get("name").last } )}
                            style={{fontWeight : '600'}}
                            />
                          </View>
                          <View style={[styles.input]}>
                            <Text >Last Name</Text>
                            <TextInput 
                            value={user.get("name").last} onChangeText={ last => user.set("name" ,{ "last" : last , "first" : user.get("name").first } )}
                            style={{fontWeight : '600'}}
                             />
                          </View>
                          <View style={[styles.input]}>
                            <Text>username</Text>
                            <TextInput 
                            value={user.get("login").username} onChangeText={ username => user.set("login" , {"username" : username})}
                            style={{fontWeight : '600'}}
                            />
                          </View>
                          <View style={[styles.input]}>
                            <Text>Email</Text>
                            <TextInput value={user.get("email")} onChangeText={email => user.set("email" , email)}
                            style={{fontWeight : '600'}}
                            />
                          </View>
                          <Ripple style={[styles.input]}  onPress={() => this.location.toggle()}>
                              <Text>Location</Text>
                              <Text style={{fontWeight : '600'}}>{this.state.city}</Text>
                          </Ripple>
                          <Ripple style={[styles.input]}  onPress={() => this.language.toggle()}>
                              <Text>Language</Text>
                              <Text style={{fontWeight : '600'}}>{this.state.language}</Text>
                          </Ripple>
                        </View>
                        
                    <Modal   animationType={'slide'}     transparent={false}  visible={this.state.showCamera} 
                    onRequestClose={() => {   this.setState("showCamera" ,  false); }}  >
                            <NavigationBar {...{rightAction, title }}/>
                            <CameraRollPicker   maximum={10}  imagesPerRow={4}   callback={this.setAvatar}   />
                    </Modal>
                    <ActionSheet title="Select your community"  ref={ ref => this.location = ref}>
                      <View>
                        <Picker
                          style={{  }}
                          selectedValue={this.state.city}
                          onValueChange={this.setCity}>
                          { secteurs.map((city , key) =>  <Picker.Item key={key} label={city.name} value={city.name}/>) }
                        </Picker>
                        <Ripple style={{backgroundColor: "#4A148C", padding:10, margin: 10}} onPress={() => this.location.toggle() }>
                          <Text style={{color : 'white'}}  > Save </Text>
                        </Ripple>
                      </View>
                  </ActionSheet>
                  <ActionSheet title="Language Selection"   ref={ ref => this.language = ref}>
                      <Picker
                        selectedValue={this.state.language}
                        onValueChange={this.setLanguage}>
                        <Picker.Item label="Francais" value="francais" />
                        <Picker.Item label="English" value="english" />
                      </Picker>
                      <Ripple style={{backgroundColor: "#4A148C", padding:10, margin: 10}} onPress={() => this.language.toggle() }>
                        <Text style={{color : 'white'}}   >Save </Text>
                      </Ripple>
                  </ActionSheet>
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
    paddingLeft : 10,
    paddingRight : 10,
    marginBottom: 5,
    height: 45,
    textAlign: 'center',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: '#fcfcfc',
    borderColor : '#f1f1f1',
    flex : 1 , flexDirection: 'row' , justifyContent: 'space-between' , alignItems:'center'
  },
});