import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import HotEvents from './HotEvents'
import AgendaView from './AgendaView'
import { createStackNavigator } from 'react-navigation';


const screenStack = createStackNavigator({
    hot: {
      screen: HotEvents
    },
    full: {
      screen: AgendaView
    }
  }, {headerMode: 'none'})

  export default screenStack;