import React, { Component } from 'react';
import {  View, Text, ScrollView} from 'react-native';
import { NavigationBar, InfoText } from '../../components';


export default class About extends Component {
  render() {
      const title = "About Us"
      const back = true
      const {navigation} = this.props
    return (
        <View style={{flex :  1 }}>
        <NavigationBar {...{navigation , title , back}} />
        <View style={{flex: 1 , justifyContent:'center' , alignItems:'center'}}>
          
           <Text>
               Just for Fun!
            </Text>
        </View>
     </View>
    );
  }
}
