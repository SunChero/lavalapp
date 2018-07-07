import React, { Component } from 'react';
import {  View, Text, ScrollView , StyleSheet , Switch} from 'react-native';
import { NavigationBar, InfoText } from '../../components';
import Ripple from 'react-native-material-ripple'
//import {reset,  Sync} from '../../api/functions'
import {ScheduleNotification} from '../../api/Notifications'
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
        return ScheduleNotification(evts)
    }
    getNextWeekEvents = () => {
        return this.state.events.filter(ev => moment(parseInt(ev._eventDate)).isBetween(moment(), moment().add(1, 'week')))
    } 
  render() {
      const title = "Calendar Sync Options"
      const back = "settings"
      const {navigation} = this.props;
      const {categories }=  navigation.state.params;
    return (
        <View style={{flex :  1 , backgroundColor:'white'}}>
        <NavigationBar {...{navigation , title , back}} />
        <View style={{flex: 1}}>
            <ScrollView >
                {
                   categories.map( (cat , key) =>(
                    <Ripple key={key} style={styles.listItem} onPress={() =>{this.toggle(cat.Id)}} >
                         <Text>{cat.Label} </Text>
                            <Switch    value={this.state.active.includes(cat.Id)}    />
                   </Ripple>
                    ))
                } 
                <Ripple style={{backgroundColor: "black", padding:20, margin: 10, alignItems:'center', justifyContent: 'center'}}  onPress={this.SyncPreferedEvents}>
                    <Text style={{color: 'white'}}>Sync Now</Text> 
                </Ripple>
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
        fontWeight: '900' ,
        color : 'black',
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