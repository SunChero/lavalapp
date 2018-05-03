import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import MainView from './MainView'
import { StackNavigator } from 'react-navigation';
const screenStack = StackNavigator({
    main: {
      screen: MainView
    }
  }, {headerMode: 'none', mode : 'card'})

  export default screenStack;