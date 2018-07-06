import MainScreen from './Main'
import { StackNavigator } from 'react-navigation';
import Policies from './Policies';
import About from './About';
import Calendar from './Calendar';
import FeedBack from './FeedBack';
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
    calendar: {
      screen: Calendar
    },
    edit : {
      screen : EditScreen
    },
    feedback : {
      screen : FeedBack
    }
  }, {headerMode: 'none'})

  export default screenStack;