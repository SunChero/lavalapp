import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import NewsList from './NewsList'
import NewsPage from './NewsPage'
import { createStackNavigator } from 'react-navigation';

const screenStack = createStackNavigator({
    list: {
      screen: NewsList
    },
    page: {
      screen: NewsPage
    }
  }, {headerMode: 'none'})

  export default screenStack;