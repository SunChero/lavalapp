import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import HotEvents from './HotEvents'
import AgendaView from './AgendaView'
import { StackNavigator } from 'react-navigation';


const screenStack = StackNavigator({
    hot: {
      screen: HotEvents
    },
    full: {
      screen: AgendaView
    }
  }, {headerMode: 'none'})

  export default screenStack;