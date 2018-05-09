import React from 'react'
import { ScrollView, StyleSheet, Text, View, AsyncStorage } from 'react-native'
import {Avatar, List , ListItem} from 'react-native-elements'
import {Icon , EmptyShell , InfoText} from "../../components"
import {inject, observer} from 'mobx-react/native'
import { Constants, Permissions, Notifications , Facebook} from 'expo';
import { SocialIcon } from 'react-native-elements'
import {default as registerPush} from '../../api/registerForPushNotificationsAsync'
const PUSH_ENDPOINT = 'http://45.77.147.98/__-__register';



@inject('store')
@observer
export default class MainScreen extends React.Component {
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
      console.log(this.state.token)
      if(! this.state.token) {
       let token = registerPush()
       this.setState({
         'token' : token,
         'pushNotifications' : true
       })
      }
    }
    render() {
    const user = global.user.get()
    const {navigation} = this.props
    const title = "Profile"
    const expanded = false
    const header = <View style={styles.userRow}>
                      <View style={styles.userImage}>
                          <Avatar   rounded  source={{ uri: user.picture.thumbnail }}  size={36}/>
                      </View>
                        <View style={{flex : 3}}>
                          <Text style={{ fontSize: 16 , color : 'black' }}>@{user.login.username}</Text>
                          <Text  style={{   color: 'black', fontSize: 16,  }}>  {user.id} </Text>
                        </View>
                   </View>
    const body = 
              <View>
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
              </View>
       
      return (
        <EmptyShell 
          body={body}
          header={header}
          {...{navigation , title , expanded , rightAction : {Label : 'somethign' , title: 'something'}}}
        />
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
