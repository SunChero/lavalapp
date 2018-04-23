import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import MainView from './MainView'
import ChatView from './ChatView'
import { StackNavigator } from 'react-navigation';

const screenStack = StackNavigator({
    main: {
      screen: MainView
    },
    chat: {
      screen: ChatView
     
    },
   
  }, {headerMode: 'none', mode : 'card'})

  export default screenStack;