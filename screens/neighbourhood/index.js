import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import SectorsListView from './SectorsListView'
import { createStackNavigator } from 'react-navigation';
import SectorView from './SectorView';

const screenStack = createStackNavigator({
  sectors: {
    screen: SectorsListView
  },
  sector: {
      screen: SectorView
    }
  }, {headerMode: 'none'})

  export default screenStack;