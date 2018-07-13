import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import MainView from './MainView'
import { createStackNavigator } from 'react-navigation';
const screenStack = createStackNavigator({
    main: {
      screen: MainView
    }
  }, {headerMode: 'none', mode : 'card'})

  export default screenStack;