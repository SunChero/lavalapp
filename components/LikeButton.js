import React, { Component } from 'react';
import {Text ,IconButton} from './index'

export default class LikeButton extends React.PureComponent{
  render() {
    const {onLikeFunc , liked , counter , color } = this.props;
    console.log(liked)
    onPress = () =>   liked ? onLikeFunc(false) : onLikeFunc(true)
    const iconname = liked ? 'ios-heart' : 'ios-heart-outline'
    return (
        <IconButton  name={iconname} type="ionicons" size={32} onPress={onPress} color={color}>
             <Text type="title2" style={{fontSize: 20, marginLeft:5 , color: color}}>{counter}</Text>
        </IconButton>
    );
  }
}
