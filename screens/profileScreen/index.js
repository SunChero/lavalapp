import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import MainScreen from './MainScreen'
import FeedBack from './FeedBackScreen'
import { StackNavigator } from 'react-navigation';
import Policies from './PoliciesScreen';
import About from './AboutUsScreen';
import Language from './LanguageScreen';
import Location_ from './LocationScreen';
import EditScreen from './EditScreen'

const screenStack = StackNavigator({
    main: {
      screen: MainScreen
    },
    about: {
      screen: About
    },
    feedback: {
      screen: FeedBack
    },
    language: {
      screen: Language
    },
    location: {
      screen: Location_
    },
    policies: {
      screen: Policies
    },
    edit : {
      screen : EditScreen
    }
  }, {headerMode: 'none'})

  export default screenStack;