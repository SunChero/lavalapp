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
  
  constructor(props){
      super(props)
      this.state =  {
        pushNotifications: true,
        token : null,
        facebook :{}
      }
      this.sync = props.store.user.get('sync') || []

  }
    async componentDidMount(){
      const value = await AsyncStorage.getItem('@ICILAVAL:NotificationToken');
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
    onLangPress = () => {
      this.pickLang.toggle();
    }
    pickLangRef = (pickLang) => {
        if (pickLang) {
            this.pickLang = pickLang;
        }
    }
    onFeedPress = () => {
      this.pickFeed.toggle();
     this.feedback && this.props.store.sendFeedback({msg : this.feedback})
     
    }
    pickFeedRef = (pickFeed) => {
        if (pickFeed) {
            this.pickFeed = pickFeed;
        }
    }
    onLocPress = () => {
      this.pickLoc.toggle();
    }
    onSyncPress = () => {
      this.props.store.user.set('sync' , this.sync)
      this.syncRef.toggle();
    }
    syncRef = sync =>{
      if(sync){
        this.syncRef = sync;
      }
    }
    pickLocRef = (pickLoc) => {
        if (pickLoc) {
            this.pickLoc = pickLoc;
        }
    }
    onChangefeedback = (text) => {
      this.feedback = text
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
              <InfoText text="Account" />
                <List containerStyle={styles.listContainer}>
                <Ripple  onPress={() => this.onPressOptions('edit')}>
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
                <Ripple  onPress={this.onLocPress}>
                    <ListItem 
                    title="Location"
                    rightTitle={user.city} 
                    containerStyle={styles.listItemContainer}
                    leftIcon={<Icon 
                      containerStyle={[styles.icon, {backgroundColor: 'transparent'}]}
                      color="black"
                      name="md-pin" 
                      type="ionicon" size={22}
                        />  }
                    />
              </Ripple>
              <Ripple onPress={this.onLangPress}>
                  <ListItem 
                  title="Language" 
                  rightTitle={user.language}    
                  containerStyle={styles.listItemContainer}
                  leftIcon={<Icon 
                    containerStyle={[styles.icon, {backgroundColor: 'transparent'}]}
                    color="black"
                    name="md-quote" 
                    type="ionicon" size={22}
                    /> }
                  />
                 </Ripple>  
                <InfoText text="Settings" />
                <Ripple>
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
                  <Ripple  onPress={this.onSyncPress} >
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
                <Ripple  onPress={() => this.onPressOptions('policies')}>
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
                <Ripple  onPress={this.onFeedPress} >
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
              <ActionSheet title="Language Selection"  ref={this.pickLangRef}>
                  <Picker
                    selectedValue={user.language}
                    onValueChange={itemValue => this.props.store.user.set("language" , itemValue)}>
                    <Picker.Item label="Francais" value="francais" />
                    <Picker.Item label="English" value="english" />
                  </Picker>
                  <Ripple style={{backgroundColor: "#4A148C", padding:10, margin: 10}} onPress={this.onLangPress}>
                     <Button title="Save" color="white"  > </Button>
                  </Ripple>
              </ActionSheet>
              <ActionSheet title="Select your community"  ref={this.pickLocRef}>
                <View>
                  <Picker
                    style={{  }}
                    selectedValue={user.city}
                    onValueChange={itemValue => this.props.store.user.set("city" , itemValue)}>
                    {
                     this.props.store.site.info.secteurs.map((city , key) =>  <Picker.Item key={key} label={city.name} value={city.name}/>)
                    }
                  </Picker>
                  <Ripple style={{backgroundColor: "#4A148C", padding:10, margin: 10}} onPress={this.onLocPress}>
                     <Button title="Save" color="white"  > </Button>
                  </Ripple>
                </View>
              </ActionSheet>
              <ActionSheet title="FeedBack / Questions"  ref={this.pickFeedRef} >
                <View style={styles.container}>
                  <TextInput  style={styles.textInput} 
                    underlineColorAndroid="transparent" 
                    textAlignVertical="top" 
                    multiline  autoFocus
                    onChangeText={(text) => this.onChangefeedback(text)}
                  />
                   <Ripple style={{backgroundColor: "#4A148C", padding:10, margin: 10}}  onPress={this.onFeedPress}>
                     <Button title="Save" color="white" > </Button>
                  </Ripple>
                  <KeyboardSpacer />
              </View>
              </ActionSheet>
              <ActionSheet title="Calendar Sync Options"  ref={this.syncRef} >
                <ScrollView containerStyle={styles.container}>
                {
                   this.props.store.site.info.categories.map( cat =>(
                    <ListItem switchButton  hideChevron 
                      title={cat.Label}
                      switched={this.sync.includes(cat.Id)}  
                      onSwitch={() =>{this.sync.push(cat.Id)}} 
                      containerStyle={styles.listItemContainer}
                    />
                   ))
                  } 
                  <Ripple style={{backgroundColor: "#4A148C", padding:10, margin: 10}}  onPress={this.onSyncPress}>
                     <Button title="Save" color="white" > </Button>
                  </Ripple>
              </ScrollView>
              </ActionSheet>
              
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
    scroll: {
       // backgroundColor: 'black',
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
        borderBottomWidth: 0,
        backgroundColor: '#fff'
      },
      listItemContainer: {
        fontWeight: '900' ,
        color : 'black',
        borderBottomWidth: 0,
        backgroundColor:"#fcfcfc"
      },
      textInput: {
        height: 143,
        ...StyleGuide.typography.body
        
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
