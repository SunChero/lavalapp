import * as React from "react";
import {observable, action} from "mobx";
import {observer} from "mobx-react/native";
import {StyleSheet, TextInput, View , Text , Modal , Image, ScrollView} from "react-native";

import {StyleGuide} from './theme'

import CameraRollPicker from 'react-native-camera-roll-picker';
import {NavigationBar, Footer, KeyboardSpacer , Comments} from "./index";
import {Icon, Avatar} from 'react-native-elements'
@observer
export default class NewMessage extends React.Component<{}> {

    @observable images = [];
    @observable location = null;
    @observable Camera = false;
    constructor(props){
        super(props)
        this.state = {
            location : {
                latitude : null,
                longitude : null
            },
        }
    }
    selectImages = (images) => {
        this.images = images
    }
    showCamera = () =>{
        this.Camera = true;
    }
    hideCamera = () =>{
        this.Camera = false;
    }
    setPosition = () =>{
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                  this.location =  {
                          latitude: position.coords.latitude,
                          longitude: position.coords.longitude,
                      }
                },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
          );
    }
    render() {
        const title = "Select Image"
        const rightAction = {icon : "md-checkmark-circle-outline" , type:"ionicons" ,  onPress : this.hideCamera  }
        return (
            <View style={styles.container}>
                {this.location && <View style={{ backgroundColor:"black" ,padding: 20 }}> <Text style={{color: 'white'}}>{this.location.latitude +' \ '+ this.location.longitude} </Text></View> }
               
                <Modal   animationType={'slide'}     transparent={false}  visible={this.Camera}  onRequestClose={() => {
                        this.showCamera = false;
                        }}
                >
                    <NavigationBar {...{rightAction, title }}/>
                    <CameraRollPicker   maximum={10}  imagesPerRow={4}   callback={this.selectImages}   selected={this.images}   />
                </Modal>
                <TextInput  style={styles.textInput}  placeholder="Description"  underlineColorAndroid="transparent"  textAlignVertical="top" multiline  autoFocus
                    onChangeText={(text) => this.props.onChange(text)}
                />
                {
                    this.props.voila && (
                        <Footer>
                            <Icon color="black" reverse reverseColor="white" name="map-pin" raised={true} size={24} type="feather"  onPress={this.setPosition}/>
                            <ScrollView horizontal contentContainerstyle={{alignItems:'center', justifyContent:'center'}}>
                                { this.images.map(i => <Avatar  rounded  medium   source={{uri: i.uri}}/>) }
                            </ScrollView>
                             
                            <Icon color="black" reverse reverseColor="white" name="ios-camera" raised={true} size={24} type="ionicon"  onPress={this.showCamera}/>
                        </Footer>
                        
                    )
                }
                
                <KeyboardSpacer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //padding: StyleGuide.spacing.base
    },
    textInput: {
        height: 143,
        ...StyleGuide.typography.body
    }, 
    image: {
        width: 100,
        height: 100,
        borderRadius: 0,
        margin: 3,
        resizeMode: 'cover',
      }

});
