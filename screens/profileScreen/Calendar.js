import React, { Component } from 'react';
import {  View, Text, ScrollView , StyleSheet , Switch} from 'react-native';
import { NavigationBar, InfoText } from '../../components';
import Ripple from 'react-native-material-ripple'
import {Sync} from '../../api/Notifications'
import moment from 'moment';

export default class Calendar extends React.PureComponent {
    state ={
        active : this.props.navigation.state.params.user.get('sync'),
        events : this.props.navigation.state.params.events
    }
    toggle = category =>{
        let cats = this.state.active
        if(this.state.active.includes(category)){
            this.setState({"active" : this.state.active.filter(c => c != category)})
        }
        else {
            this.setState({"active" : [...this.state.active , category]})
            
        }
      
    }
    sync = () =>{
        this.props.navigation.state.params.user.set('sync' , this.state.active)
        this.props.navigation.goBack()
    }
    SyncPreferedEvents = () => {
        let evts = []
        //reset()
        let tmp = this.state.active
        this.getNextWeekEvents().map( e => {
            cIds = e.categories.map(cat =>  cat.Id)
            cIds.map( cid => {
                tmp.includes(cid) ? evts.push(e) : null
            })
        })
        Sync(evts)
        this.sync()
    }
    getNextWeekEvents = () => {
        return this.state.events.filter(ev => moment(parseInt(ev._eventDate)).isBetween(moment(), moment().add(1, 'week')))
    } 
  render() {
      const title = "Calendar"
      const rightAction = {
          text : 'Sync',
          onPress : this.SyncPreferedEvents
         
      }
      const back = "settings"
      const {navigation} = this.props;
      const {categories }=  navigation.state.params;
    return (
        <View style={{flex :  1 , backgroundColor:'white'}}>
        <NavigationBar {...{navigation , title , back , rightAction}} />
        <View style={{flex: 1}}>
            
            <ScrollView >
                <View style={{margin : 5 ,padding :5 , backgroundColor: 'goldenrod'}}>
                    <Text style={{fontSize: 12 ,color : 'white'}}>
                    this option Allows you to import events to your calendar, for now only the current week events are imported,
                    to disable this just unselect all categories 
                    </Text>
                    <Text style={{fontWeight: 'bold',fontSize: 12 ,color : 'white'}}>
                    you need to logon at least once a week to receive the latest events.
                    </Text>
                </View>
                {
                   categories.map( (cat , key) =>(
                    <Ripple key={key} style={styles.listItem} onPress={() =>{this.toggle(cat.Id)}} >
                         <Text>{cat.Label} </Text>
                            <Switch    value={this.state.active.includes(cat.Id)}    />
                   </Ripple>
                    ))
                } 
                
            </ScrollView>
           
        </View>
     </View>
    );
  }
}
const styles = StyleSheet.create({
     
        listContainer: {
          marginBottom: 0,
          marginTop: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          backgroundColor: '#fff'
        },
        listItem: {
        backgroundColor:"#fcfcfc",
        flexDirection : 'row',
        alignItems: 'center',
        alignContent : 'center',
        justifyContent: 'space-between',
        height: 40,
        paddingLeft:  10,
        paddingRight:  10,
        }    
       
    })