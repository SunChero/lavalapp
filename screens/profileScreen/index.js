import MainScreen from './Main'

import { StackNavigator } from 'react-navigation';
import Policies from './Policies';
import About from './About';

import EditScreen from './Edit'

const screenStack = StackNavigator({
    main: {
      screen: MainScreen
    },
    about: {
      screen: About
    },
    policies: {
      screen: Policies
    },
    edit : {
      screen : EditScreen
    }
  }, {headerMode: 'none'})

  export default screenStack;