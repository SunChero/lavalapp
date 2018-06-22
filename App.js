import React from 'react';
import { createTheme, IconBadge}  from './components'
import { Platform, StatusBar  } from 'react-native';
import {NavigationOptions, tabBarOptions} from './api/constants'
import {StackNavigator, TabNavigator} from 'react-navigation'
import  NewsScreen from './screens/NewsScreen'
import  EventsScreen from './screens/eventsScreen'
import  InboxScreen from './screens/InboxScreen'
import  ProfileScreen from './screens/profileScreen'
import  Neighbourhood from './screens/eventsScreen/AgendaView'
import {store} from './store/index'
import {Provider , observer} from 'mobx-react/native'
import {Asset , Font, AppLoading} from "expo";
import { Ionicons, Entypo, Feather } from '@expo/vector-icons';
import ModalHost from "expo/src/modal/ModalHost";
import Activity  from './screens/Activity';
import User from './screens/User'
import Chat from './screens/Chat'

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
    await store.init()
    StatusBar.setBarStyle("dark-content");
    if (Platform.OS === "android") {  StatusBar.setBackgroundColor("white");  }
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
      <Provider store={store} theme={theme} > 
        <ModalHost>   
          <RootNavigator />
         
        </ModalHost>
      </Provider>
      );
    }
  }
}
const RootTabNavigator = TabNavigator({
  news : {screen : NewsScreen},
  explore : {screen : EventsScreen},
  calendar : {screen : Neighbourhood},
  inbox : {
            screen : InboxScreen,
            navigationOptions: ({ screenProps , focused }) => ({
              tabBarIcon: ({tintColor , focused}) => <IconBadge focused={focused} show={store.totalNotifications} />
            })
          },
  profile : {screen : ProfileScreen}
}, {
  navigationOptions: NavigationOptions,
  tabBarOptions: tabBarOptions
})

const RootNavigator = StackNavigator({
  RootTabs : {screen : RootTabNavigator},
  activity : {screen : Activity},
  user : {screen : User},
  chat : {screen : Chat}
},{
  headerMode: 'none'
})

