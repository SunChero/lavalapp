import React, { Component } from 'react';
import {  View, Text, TextInput} from 'react-native';
import { NavigationBar, InfoText,KeyboardSpacer } from '../../components';
import Ripple from 'react-native-material-ripple'

export default class FeedBack extends Component {
  render() {
      const title = "Drop us a line"
      const back = "Settings"
      const {navigation} = this.props
    return (
        <View style={{flex :  1 }}>
        <NavigationBar {...{navigation , title , back}} />
            <View style={{flex: 1 , justifyContent:'center' , alignItems:'center'}}>
                  <TextInput    style={{flex:1 , backgroundColor: 'white' ,width:'100%', height: 70}}
                    underlineColorAndroid="transparent" 
                    textAlignVertical="top" 
                    multiline  autoFocus
                    onChangeText={(text) => this.onChangefeedback(text)}
                  />
                   <Ripple style={{backgroundColor: "#4A148C", padding:10, margin: 10}}  onPress={() =>navigation.goBack()}>
                     <Text style={{color: "white"}}>Save</Text> 
                  </Ripple>
                  <KeyboardSpacer />
           
        </View>
     </View>
    );
  }
}
