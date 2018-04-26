import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import HotEventsView from './HotEventsView'
//import AgendaView from './AgendaView'
import { StackNavigator } from 'react-navigation';
import ActivitySheet from './ActivitySheet';

const screenStack = StackNavigator({
    hot: {
      screen: HotEventsView
    },
    // full: {
    //   screen: AgendaView
    // },
    activity: {
      screen: ActivitySheet
    }
  }, {headerMode: 'none'})

  export default screenStack;