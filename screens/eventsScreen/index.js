import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import HotEventsView from './HotEventsView'
import AgendaView from './AgendaView'
import SheatView from './SheatView'
import { StackNavigator } from 'react-navigation';
const screenStack = StackNavigator({
    hot: {
      screen: HotEventsView
    },
    full: {
      screen: AgendaView
    },
    event: {
      screen: SheatView
    }
  }, {headerMode: 'none'})

  export default screenStack;