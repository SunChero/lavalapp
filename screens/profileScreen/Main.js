import React from 'react'
import { ScrollView, StyleSheet, Picker,Text, View, AsyncStorage , TextInput , TouchableHighlight, Button} from 'react-native'
import {Avatar,Icon, List , ListItem} from 'react-native-elements'
import {ActionSheet,InfoText , NavigationBar, StyleGuide , KeyboardSpacer} from "../../components"
import {inject, observer} from 'mobx-react/native'
import { Constants, Permissions, Notifications , Facebook} from 'expo';
import { SocialIcon } from 'react-native-elements'
import {default as registerPush} from '../../api/registerForPushNotificationsAsync'
import Ripple from 'react-native-material-ripple';

const PUSH_ENDPOINT = 'http://45.77.147.98/__-__register';

@inject('store')
@observer
export default class MainScreen extends React.Component {
  
 state =  {
    pushNotifications: true,
    token : null,
    user : this.props.store.user.data
  }
    async componentDidMount(){
      const value = await AsyncStorage.getItem('@ICILAVAL:NotificationToken');
      this.setState({
        'token': value,
        'pushNotifications' : value ? true : false,
         
      });
    }
    onPressOptions = (route, options) => {
      this.props.navigation.navigate(route , options)
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
    const {user} = this.state
    const {navigation } = this.props
    const {categories , secteurs} =  this.props.store.site.info
  
    const title = "Profile"
      return (
      <View style={{flex : 1 , backgroundColor : 'white'}} >
           <NavigationBar title="Settings" />
          <ScrollView style={{flex:1}}>
              <InfoText text="Account" />
                <List containerStyle={styles.listContainer}>
                <Ripple  onPress={() => this.onPressOptions('edit', {...{navigation , secteurs , user : this.props.store.user}})}>
                  <ListItem 
                    title="Profile" 
                    rightTitle={` ${user.name.first} / ${user.name.last}`}   
                    containerStyle={styles.listItemContainer}
                      leftIcon={ 
                        <Icon 
                        containerStyle={[styles.icon, {backgroundColor: 'transparent'}]}
                        color="black"
                        name="md-contact" 
                        type="ionicon" size={22}
                        />
                    }
                  />
                </Ripple>
               
                <InfoText text="Settings" />
                <Ripple >
                  <ListItem switchButton  hideChevron 
                    title="Push Notifications" 
                    switched={this.state.pushNotifications}  
                    onSwitch={this.onChangePushNotifications} 
                    containerStyle={styles.listItemContainer}
                    leftIcon={ <Icon 
                      containerStyle={[styles.icon, {backgroundColor: 'transparent'}]}
                      color="black"
                      name="ios-notifications" 
                      type="ionicon" size={22}
                      />  }
                  />
                  </Ripple>
                  <Ripple  onPress={() => this.onPressOptions('calendar' , {...{navigation , categories , user : this.props.store.user , events : this.props.store.site.info.events}})}>
                  <ListItem 
                    title="Calendar Sync"  
                    containerStyle={styles.listItemContainer} 
                  leftIcon={<Icon 
                    containerStyle={[styles.icon, {backgroundColor: 'transparent'}]}
                    color="black"
                    name="ios-sync" 
                    type="ionicon" size={22}
                    /> }
                  />
                </Ripple>
              
                </List>
             
                <InfoText text="More" />
                <List containerStyle={styles.listContainer}>
                <Ripple onPress={() => this.onPressOptions('about')}>
                  <ListItem 
                  title="About US"    
                  containerStyle={styles.listItemContainer}
                  leftIcon={<Icon 
                    containerStyle={[styles.icon, {backgroundColor: 'transparent'}]}
                    color="black"
                    name="md-quote" 
                    type="ionicon" size={22}
                    /> }
                  />
                </Ripple>
                <Ripple onPress={() => this.onPressOptions('policies')}>
                    <ListItem  
                    title="Terms and Policies"  
                    containerStyle={styles.listItemContainer}
                    leftIcon={ <Icon 
                      containerStyle={[styles.icon, {backgroundColor: 'transparent'}]}
                      color="black"
                      name="md-ribbon" 
                      type="ionicon" size={22}
                      /> }
                    />
                </Ripple>
                <Ripple  onPress={() => this.onPressOptions('feedback' ,{...{navigation , sendFeedback : this.props.store.sendFeedback }})} >
                  <ListItem 
                    title="Send FeedBack"  
                    containerStyle={styles.listItemContainer} 
                  leftIcon={<Icon 
                    containerStyle={[styles.icon, {backgroundColor: 'transparent'}]}
                    color="black"
                    name="ios-paper-plane" 
                    type="ionicon" size={22}
                    /> }
                  />
                </Ripple>
                
                </List>
              </ScrollView>  
           
        </View>
      )
    }
   
  }
const styles = StyleSheet.create({
  ripple: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    minHeight: 56,
    margin: 4,
    borderRadius: 2,
    elevation: 2,
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
   
      listContainer: {
        marginBottom: 0,
        marginTop: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        backgroundColor: '#fff'
      },
      listItemContainer: {
        borderBottomWidth: 0,
        backgroundColor:"#fcfcfc"
      },
     
    icon : {
      width: 28,
      height: 28,
      marginLeft: 0,
      marginRight: 5,
      borderRadius: 5,
     // borderWidth: 1,
      borderColor: 'transparent',
      justifyContent: 'center'
    }
  })
