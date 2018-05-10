import React, { Component } from 'react';
import {Text ,IconButton} from './index'

export default class VueButton extends React.PureComponent{
  render() {
    const {count , color} = this.props;
    const counter = count || 0 ;
    return (
        <IconButton  name="ios-eye-outline" type="ionicons" size="46" color={color}>
             <Text type="title2" style={{fontSize: 20, marginLeft:5 , color: color}}>{counter}</Text>
        </IconButton>
    );
  }
}
