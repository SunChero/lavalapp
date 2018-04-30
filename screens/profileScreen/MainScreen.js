import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import {Avatar, List , ListItem} from 'react-native-elements'
import {Icon , NavigationBar, Feed , InfoText} from "../../components"
import {inject, observer} from 'mobx-react/native'
import { Constants, Permissions, Notifications } from 'expo';
const PUSH_ENDPOINT = 'https://exponent-push-server.herokuapp.com/tokens';

@inject('store')
@observer
export default class MainScreen extends React.Component {
    constructor(props){
      super(props)
      this.state =  {
        pushNotifications: true,
      }
      
    }

    onPressOptions = (route) => {
      this.props.navigation.navigate(route)
    }
    onChangePushNotifications = () => {
      this.setState(state => ({
        pushNotifications: !state.pushNotifications,
      }))
   
    }
    componentDidMount(){
      this.registerForPushNotificationsAsync()
    }
    registerForPushNotificationsAsync = async () => {
      console.log('inside register')
        try {
          const response = await Permissions.getAsync(Permissions.REMOTE_NOTIFICATIONS);
          console.log(response)
          if (response.status !== 'granted') {
            if (response.status === 'denied' || response.status === 'undetermined') {
              alert('Please enable push notifications from your device settings.');
            } else {
              const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
             
              if (status === 'granted') this.setState({ notificationsGranted: true });
            }
          } else this.setState({ notificationsGranted: true });
        } catch (error) {
          alert(error.message);
        }
        let token = await Notifications.getExpoPushTokenAsync()
        console.log(token)
        return fetch(PUSH_ENDPOINT, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: {
              value: token,
            },
          }),
        });
    };
    render() {
    const user = global.user.get()
      console.log(user)
     const {navigation} = this.props
     const title = "Profile"
        return (
          <View style={{flex :  1}}>
             <NavigationBar {...{navigation , title}} />
             <ScrollView style={styles.scroll}>
                <View style={styles.userRow}>
                  <View style={styles.userImage}>
                    <Avatar   large   rounded  source={{ uri: user.picture }}  style={{borderWidth : 2 , borderColor: 'white',}}/>
                  </View>
                  <View style={{flex : 3}}>
                    <Text style={{ fontSize: 16 , color : 'white' }}>@{user.name}</Text>
                    <Text  style={{   color: 'white', fontSize: 16,  }}>  {user._id} </Text>
                  </View>
                </View>
                <InfoText text="Account" />
                <List containerStyle={styles.listContainer}>
                  <ListItem switchButton  hideChevron  title="Push Notifications"  switched={this.state.pushNotifications}  onSwitch={this.onChangePushNotifications}  containerStyle={styles.listItemContainer}
                    leftIcon={ <Icon  containerStyle={{ backgroundColor: 'transparent',}}  icon={{type: 'material',  name: 'notifications', }}  />  }
                  />
                  <ListItem title="Location" rightTitle={user.city}  onPress={() => this.onPressOptions('location')}   containerStyle={styles.listItemContainer}
                    leftIcon={ <Icon   containerStyle={{ backgroundColor: '#57DCE7' }}   icon={{ type: 'material',  name: 'place', }} /> }
                  />
                  <ListItem title="Language" rightTitle={user.language}  onPress={() => this.onPressOptions('language')}  containerStyle={styles.listItemContainer}
                    leftIcon={<Icon  containerStyle={{ backgroundColor: '#FEA8A1' }}  icon={{type: 'material', name: 'language', }} /> }
                  />
                </List>
                <InfoText text="More" />
                <List containerStyle={styles.listContainer}>
                  <ListItem title="About US"  onPress={() => this.onPressOptions('about')}  containerStyle={styles.listItemContainer}
                    leftIcon={ <Icon containerStyle={{ backgroundColor: '#A4C8F0' }}  icon={{type: 'ionicon',name: 'md-information-circle',}} /> }
                  />
                  <ListItem  title="Terms and Policies"  onPress={() => this.onPressOptions('policies')} containerStyle={styles.listItemContainer}
                    leftIcon={ <Icon  containerStyle={{ backgroundColor: '#C6C7C6' }} icon={{type: 'entypo',name: 'light-bulb', }} />   }
                  />
                  <ListItem title="Send FeedBack"  onPress={() => this.onPressOptions('feedback')}  containerStyle={styles.listItemContainer} 
                  leftIcon={ <Icon containerStyle={{ backgroundColor: '#00C001', }} icon={{type: 'materialicon', name: 'feedback', }} />  }
                  />
                </List>
              </ScrollView>
          </View>
       
      )
    }
   
  }
const styles = StyleSheet.create({
    scroll: {
        backgroundColor: 'white',
      },
      userRow: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 6,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
        backgroundColor : '#283355',
        flex :1
      },
      userImage: {
        marginRight: 12,
        flex :1
      },
      listContainer: {
        marginBottom: 0,
        marginTop: 0,
        borderTopWidth: 0,
      },
      listItemContainer: {
        borderBottomColor: '#ECECEC',
      },
  })
