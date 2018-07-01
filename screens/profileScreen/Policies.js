import React, { Component } from 'react';
import {  View, Text, ScrollView} from 'react-native';
import { NavigationBar, InfoText } from '../../components';


export default class Policies extends Component {
  render() {
      const title = "Terms & Policies!"
      const back = true
      const {navigation} = this.props
    return (
        <View style={{flex :  1 }}>
        <NavigationBar {...{navigation , title , back}} />
        <View style={{flex: 1 , justifyContent:'center' , alignItems:'center'}}>
          
           <Text>
               Terms & Policies
            </Text>
        </View>
     </View>
    );
  }
}