import React from 'react';
import { createTheme, Icons, TabBar, TabNavigatorOptions}  from './components'
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
import { Ionicons, Entypo, Feather } from '@expo/vector-icons';
import ModalHost from "expo/src/modal/ModalHost";
import createDeepstream from 'deepstream.io-client-js';
import Activity  from './screens/Activity';
import Chat from './screens/Chat';
const DS_URL = "ws://45.77.147.98/deepstream";

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
    const user_id = Math.floor((Math.random() * 10) + 1)
    console.log(user_id)
    global.dsc = createDeepstream(DS_URL).login({
      username : 'user' + user_id ,
      password : 'password'
    });
    global.dsc.on('error' , (error) => {})
    global.dsc.on('connectionStateChanged' , (error , event , topic) => {})
    global.user = global.dsc.record.getRecord('/user/' + user_id)
    global.user.user_id = user_id
    StatusBar.setBarStyle("light-content");
    if (Platform.OS === "android") {  StatusBar.setBackgroundColor("white");  }
    await store.loadSite();
    store.getUser();
  }
  render() {
    const theme = createTheme();
    theme.switchColors ({  primary: Colors.tintColor,  secondary: "white" })
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
 }
}
const tabs = [
  { key: "news", label: "news", icon: "md-flame" , type :"ionicons" },
  { key: "profile", label: "profile", icon: "menu" , type : "ionicons"},
  { key: "explore", label: "explore", icon: "md-link", type : "ionicons" },
  { key: "people", label: "people", icon: "ios-chatbubbles-outline", type: "ionicons" },
  { key: "inbox", label: "inbox", icon: "mail", type : "ionicons" }
];

const RootTabNavigator = TabNavigator({
  news : {screen : NewsScreen},
  explore : {screen : EventsScreen},
  people : {screen : Neighbourhood},
  inbox : {screen : InboxScreen},
  profile : {screen : ProfileScreen}
},TabNavigatorOptions(tabs))
const RootNavigator = StackNavigator({
  RootTabs : {screen : RootTabNavigator},
  activity : {screen : Activity},
  chat : {screen : Chat}
},{
  headerMode: 'none'
})
