import React from 'react'
import { ScrollView, StyleSheet, Text, View, AsyncStorage } from 'react-native'
import {Avatar, List , ListItem} from 'react-native-elements'
import {Icon , EmptyShell , InfoText , NavigationBar} from "../../components"
import {inject, observer} from 'mobx-react/native'
import { Constants, Permissions, Notifications , Facebook} from 'expo';
import { SocialIcon } from 'react-native-elements'
import {default as registerPush} from '../../api/registerForPushNotificationsAsync'
const PUSH_ENDPOINT = 'http://45.77.147.98/__-__register';

@inject('store')
@observer
export default class MainScreen extends React.Component {
  static defaultProps = {
    user : {
      "gender": "female",
      "name": {
      "title": "mrs",
      "first": "yael",
      "last": "obdam"
      },
      "location": {
      "street": "826 bokstraat",
      "city": "nieuwkoop",
      "state": "friesland",
      }
      },
      "email": "yael.obdam@example.com",
      "login": {
      "username": "whiteduck842",
      },
      "id": "",
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/54.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/54.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/54.jpg"
      }
  }
  constructor(props){
      super(props)
      this.state =  {
        pushNotifications: true,
        token : null,
        facebook :{}
      }
  }
    async componentDidMount(){
      const value = await AsyncStorage.getItem('@ICILAVAL:NotificationToken');
      console.log(value)
      this.setState({
        'token': value,
        'pushNotifications' : value ? true : false
      });
    }
    onPressOptions = (route) => {
      this.props.navigation.navigate(route)
    }
    
    onChangePushNotifications = () => {
      if(! this.state.token) {
       let token = registerPush()
       this.setState({
         'token' : token,
         'pushNotifications' : true
       })
      }
    }
    render() {
    const user = this.props.store.user.data
    const {navigation} = this.props
    const title = "Profile"
    const rightAction = {
      Label : 'Edit',
      title: 'Edit',
      onPress : () =>{console.log('pressed')}
    }
      return (
      <View style={{flex : 1 , backgroundColor : 'white'}} >
           <NavigationBar title="Settings" />
          <ScrollView style={{flex:1}}>
              <InfoText text="Edit" />
                <List containerStyle={styles.listContainer}>
                  <ListItem title="Profile" rightTitle={` ${user.name.first} / ${user.name.last}`} onPress={() => this.onPressOptions('edit')}  containerStyle={styles.listItemContainer}
                      leftIcon={ <Icon containerStyle={{ backgroundColor: '#A4C8F0' }}  icon={{type: 'ionicon',name: 'md-information-circle',}} /> }
                    />
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
       // backgroundColor: 'white',
      },
      userRow: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
       
        flex :1
      },
      userImage: {
        marginRight: 5,
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
