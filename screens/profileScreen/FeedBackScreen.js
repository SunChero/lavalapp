import React, { Component } from 'react';
import {  View, Text, TextInput , StyleSheet} from 'react-native';
import { NavigationBar, InfoText , StyleGuide} from '../../components';



export default class FeedBack extends Component {
  render() {
      const title = "Drop us a line"
      const back = true
      const {navigation} = this.props
    return (
        <View style={{flex :  1 }}>
        <NavigationBar {...{navigation , title , back}} />
        <View style={{flex: 1 , justifyContent:'center' }}>
         <InfoText text="Thanks for your feedback!" /> 
        <TextInput
                    style={styles.textInput}
                    placeholder="FeedBack"
                    underlineColorAndroid="transparent"
                    textAlignVertical="top"
                    multiline
                    autoFocus
        />
        </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      padding: StyleGuide.spacing.base
  },
  textInput: {
      height: 350,
      backgroundColor: 'white',
      ...StyleGuide.typography.body
      
  }
});