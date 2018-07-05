import React from 'react'
import { ScrollView, StyleSheet, Picker,Text, View, AsyncStorage , TextInput , TouchableOpacity, Button} from 'react-native'
import {Avatar, List , ListItem} from 'react-native-elements'
import {Icon ,ActionSheet,InfoText , NavigationBar, StyleGuide , KeyboardSpacer} from "../../components"
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
              <InfoText text="Edit" />
                <List containerStyle={styles.listContainer}>
                  <ListItem title="Profile" rightTitle={` ${user.name.first} / ${user.name.last}`} onPress={() => this.onPressOptions('edit')}  containerStyle={styles.listItemContainer}
                      leftIcon={ <Icon containerStyle={{ backgroundColor: '#A4C8F0' }}  icon={{type: 'ionicon',name: 'md-information-circle',}} /> }
                    />
                  <ListItem switchButton  hideChevron  title="Push Notifications"  switched={this.state.pushNotifications}  onSwitch={this.onChangePushNotifications}  containerStyle={styles.listItemContainer}
                    leftIcon={ <Icon  containerStyle={{ backgroundColor: 'transparent',}}  icon={{type: 'material',  name: 'notifications', }}  />  }
                  />
                  <ListItem title="Location" rightTitle={user.city}  onPress={this.onLocPress}   containerStyle={styles.listItemContainer}
                    leftIcon={ <Icon   containerStyle={{ backgroundColor: '#57DCE7' }}   icon={{ type: 'material',  name: 'place', }} /> }
                  />
                  <ListItem title="Language" rightTitle={user.language}  onPress={this.onLangPress}  containerStyle={styles.listItemContainer}
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
                  <ListItem title="Send FeedBack"  onPress={this.onFeedPress}  containerStyle={styles.listItemContainer} 
                  leftIcon={ <Icon containerStyle={{ backgroundColor: '#00C001', }} icon={{type: 'materialicon', name: 'feedback', }} />  }
                  />
                </List>
              </ScrollView>  
              <ActionSheet title="Language Selection"  ref={this.pickLangRef}>
                  <Picker
                    selectedValue={user.language}
                    onValueChange={itemValue => this.props.store.user.set("language" , itemValue)}>
                    <Picker.Item label="Francais" value="francais" />
                    <Picker.Item label="English" value="english" />
                  </Picker>
                  <TouchableOpacity style={{backgroundColor: "#4A148C", padding:10, margin: 10}}>
                     <Button title="Save" color="white" onPress={this.onLangPress} > </Button>
                  </TouchableOpacity>
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
                  <TouchableOpacity style={{backgroundColor: "#4A148C", padding:10, margin: 10}}>
                     <Button title="Save" color="white" onPress={this.onLocPress} > </Button>
                  </TouchableOpacity>
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
                   <TouchableOpacity style={{backgroundColor: "#4A148C", padding:10, margin: 10}}>
                     <Button title="Save" color="white" onPress={this.onFeedPress} > </Button>
                  </TouchableOpacity>
                  <KeyboardSpacer />
              </View>
              </ActionSheet>
              
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
      textInput: {
        height: 143,
        ...StyleGuide.typography.body
        
    }
  })
