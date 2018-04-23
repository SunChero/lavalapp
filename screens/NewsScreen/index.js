import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import NewsListView from './NewsListView'
import NewsPageView from './NewsPageView'
import { StackNavigator } from 'react-navigation';

const screenStack = StackNavigator({
    list: {
      screen: NewsListView
    },
    page: {
      screen: NewsPageView
    }
  }, {headerMode: 'none'})

  export default screenStack;