import React from 'react';
import { createTheme, Icon}  from './components'
import { Text, View ,Platform, StatusBar } from 'react-native';
import {Colors} from './constants'
import {StackNavigator, TabNavigator} from 'react-navigation'
import  NewsScreen from './screens/NewsScreen'
import  EventsScreen from './screens/eventsScreen'
import  InboxScreen from './screens/InboxScreen'
import  ProfileScreen from './screens/profileScreen'
import  Neighbourhood from './screens/neighbourhood'
import {store} from './store'
import {onlinestore} from './onlineStore'
import {Provider , observer} from 'mobx-react/native'
import {observable , action} from 'mobx'
import {Asset , Font, AppLoading} from "expo";
import { Ionicons, Entypo, Feather } from '@expo/vector-icons';
import ModalHost from "expo/src/modal/ModalHost";
import Activity  from './screens/Activity';
import User from './screens/User'
import Chat from './screens/Chat'
import * as bootStrap from './api/bootstrap';

@observer

export default class App extends React.Component {
  
  state = {
    isLoadingComplete: false,
  };
  _loadResourcesAsync = async () => {
    return Promise.all([
       Asset.loadAsync([
         require('./assets/images/app.png'),
         require('./assets/images/add.png')
      
       ]),
      Font.loadAsync({
        "SFProText-Bold" :  require("./assets/fonts/Baloo-Regular.ttf"),
        "SFProText-Semibold" :  require("./assets/fonts/Exo2-Light.ttf"),
        "SFProText-Regular" : require("./assets/fonts/Exo2-Thin.ttf"),
        ...Ionicons.font,
        ...Entypo.font,
        ...Feather.font
     
      }),
    ]);
  };

  _handleLoadingError = error => {
      console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
  async componentDidMount() {
    console.disableYellowBox = true;
    await bootStrap.SignUp()
    onlinestore.Setup();
    onlinestore.subscribe();
    StatusBar.setBarStyle("dark-content");
    if (Platform.OS === "android") {  StatusBar.setBackgroundColor("white");  }
    await store.loadSite();
  }
  render() {
    const theme = createTheme();
    theme.switchColors ({  primary: "white",  secondary: "black" })
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading startAsync={this._loadResourcesAsync}  onError={this._handleLoadingError} onFinish={this._handleFinishLoading}        />
      );
    } else {
      return (
      <Provider store={store} theme={theme} onlinestore={onlinestore}> 
        <ModalHost>   
          <RootNavigator />
        </ModalHost>
      </Provider>
      );
    }
r  }
}
const RootTabNavigator = TabNavigator({
  news : {screen : NewsScreen},
  explore : {screen : EventsScreen},
  people : {screen : Neighbourhood},
  inbox : {screen : InboxScreen},
  profile : {screen : ProfileScreen}
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let iconName;
      let iconClass;
      switch (routeName) {
        case 'news':
          iconName = Platform.OS === 'ios' ? `ios-flame${focused ? '' : '-outline'}` : 'md-flame';
          iconClass ='ionicons'
          break;
        case 'explore':
          iconName = Platform.OS === 'ios' ? `ios-compass${focused ? '' : '-outline'}` : 'md-link';
          iconClass ='ionicons'
          break;
        case 'Signalement':
          iconName = Platform.OS === 'ios' ? `ios-megaphone${focused ? '' : '-outline'}` : 'md-options';
          iconClass ='ionicons'
            break;
        case 'profile':
            iconName = Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options';
            iconClass = 'ionicons'
            break;
        case 'people':
            iconName = Platform.OS === 'ios' ? `ios-people${focused ? '' : '-outline'}` : 'md-options';
            iconClass ='ionicons'
            break;
        case 'inbox':
            iconName = Platform.OS === 'ios' ? `ios-chatbubbles${focused ? '' : '-outline'}` : 'md-flame';
            iconClass ='ionicons'
            break;
        case 'Filter':
           iconName = Platform.OS === 'ios' ? `ios-funnel${focused ? '' : '-outline'}` : 'md-options';
           iconClass ='ionicons'
      }
      return (
        <Icon  containerStyle={{ backgroundColor: 'transparent'}}  type={iconClass} name={iconName} size={28}  color={focused ? "black" : "#B0BEC5"}  />
      );
    }
  }),
  tabBarOptions: {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    headerEnabled : false,
    showLabel: true,
    activeTintColor: "black",
    inactiveTintColor : '#B0BEC5',
		labelStyle: {
      fontSize: 12,
      fontWeight: '100'
		},
		style: {
			borderTopWidth: 1,
      borderTopColor: 'white' ,
      backgroundColor : "white",
     
		},
	}
})

const RootNavigator = StackNavigator({
  RootTabs : {screen : RootTabNavigator},
  activity : {screen : Activity},
  user : {screen : User},
  chat : {screen : Chat}
},{
  headerMode: 'none'
})
