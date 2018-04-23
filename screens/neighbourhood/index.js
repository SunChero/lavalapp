import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import SectorsListView from './SectorsListView'
import { StackNavigator } from 'react-navigation';
import SectorView from './SectorView';

const screenStack = StackNavigator({
  sectors: {
    screen: SectorsListView
  },
  sector: {
      screen: SectorView
    }
  }, {headerMode: 'none'})

  export default screenStack;