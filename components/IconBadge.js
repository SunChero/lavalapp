import React, { Component } from 'react';
import {View , Text , StyleSheet} from 'react-native'
import {Icon} from './index'
export default class IconBadge extends React.PureComponent{
  render() {
    const {show , focused} = this.props;
    return (
        <View >
            <Icon  containerStyle={{ backgroundColor: 'transparent'}}  type="ionicons" name={focused ? 'ios-chatbubbles' :'ios-chatbubbles-outline' } size={28}  color={focused ? "black" : "#B0BEC5"}  />
                {show && <View style={styles.IconBadge}><Text style={{color: 'white'}}>!</Text></View>}
        </View>
    );
  }
}

var styles = StyleSheet.create({
    IconBadge: {
      position:'absolute',
      top:1,
      right:-10,
      minWidth:15,
      height:15,
      borderRadius:10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF0000'
    },
    MainView: {
  
    }
  });