import React from 'react';
import { createTheme, Icons}  from './components'
import { Text, View ,Platform, StatusBar } from 'react-native';
import {Colors} from './constants'
import {StackNavigator, TabNavigator} from 'react-navigation'
import  NewsScreen from './screens/NewsScreen'
import  EventsScreen from './screens/eventsScreen'
import  InboxScreen from './screens/InboxScreen'
import  ProfileScreen from './screens/profileScreen'
import  Neighbourhood from './screens/neighbourhood'
import {store} from './store'
import {Provider , observer} from 'mobx-react/native'
import {observable , action} from 'mobx'
import {Asset , Font, AppLoading} from "expo";
import { Ionicons } from '@expo/vector-icons';
import ModalHost from "expo/src/modal/ModalHost";
import createDeepstream from 'deepstream.io-client-js';
const DS_URL = "ws://45.77.147.98/deepstream";

@observer
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };
  _loadResourcesAsync = async () => {
    return Promise.all([
      // Asset.loadAsync([
      //   require('./assets/images/app.png')
      
      // ]),
      Font.loadAsync({
        ...Ionicons.font,
        "SFProText-Bold": require("./assets/fonts/Baloo-Regular.ttf"),
        "SFProText-Semibold": require("./assets/fonts/Exo2-Light.ttf"),
        "SFProText-Regular": require("./assets/fonts/Exo2-Thin.ttf")
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
    global.dsc = createDeepstream(DS_URL).login();
    global.user = global.dsc.record.getRecord('/user/1')
    StatusBar.setBarStyle("light-content");
    if (Platform.OS === "android") {          StatusBar.setBackgroundColor("white");      }
    await store.loadSite();
    store.getUser();
  }
  render() {
    const theme = createTheme();
    const Social=  {      primary: Colors.tintColor,      secondary: "#f7ebfe"    }
    theme.switchColors(Social)
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading          startAsync={this._loadResourcesAsync}          onError={this._handleLoadingError}          onFinish={this._handleFinishLoading}        />
      );
    } else {
      return (
      <Provider store={store}  theme={theme} > 
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
          iconName = Platform.OS === 'ios' ? `network` : 'md-flame';
          iconClass ='entypo'
          break;
        case 'explore':
          iconName = Platform.OS === 'ios' ? `calendar` : 'md-link';
          iconClass ='foundation'
          break;
        case 'Signalement':
          iconName = Platform.OS === 'ios' ? `ios-megaphone${focused ? '' : '-outline'}` : 'md-options';
          iconClass ='ionicon'
            break;
        case 'profile':
            iconName = Platform.OS === 'ios' ? `menu` : 'md-options';
            iconClass = 'feather'
            break;
        case 'people':
            iconName = Platform.OS === 'ios' ? `google-circles-extended` : 'md-options';
            iconClass ='material-community'
            break;
        case 'inbox':
            iconName = Platform.OS === 'ios' ? `mail` : 'md-flame';
            iconClass ='feather'
            break;
        case 'Filter':
           iconName = Platform.OS === 'ios' ? `ios-funnel${focused ? '' : '-outline'}` : 'md-options';
           iconClass ='ionicon'
      }
      return (
        <Icons  
            containerStyle={{ backgroundColor: 'transparent'}}  
            icon={{type: iconClass, name: iconName , color: focused ? Colors.tabIconSelected : Colors.tabIconDefault}}
        />
      );
    }
   
  }),
  tabBarOptions: {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    headerEnabled : false,
		activeTintColor: Colors.tintColor,
		//inactiveTintColor: Colors.tabIconSelected,
		labelStyle: {
			fontSize: 12,
     // color: Colors.tintColor
		},
		style: {
			borderTopWidth: 1,
			borderTopColor: 'white'
		},
	}
})

const RootNavigator = StackNavigator({
  RootTabs : {screen : RootTabNavigator}
},{
  headerMode: 'none'
})
