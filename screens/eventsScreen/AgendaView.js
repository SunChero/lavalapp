import React, { Component } from 'react';
import {  View, Text,StyleSheet } from 'react-native';
import {observer, inject} from 'mobx-react/native'
import {Agenda} from 'react-native-calendars';
import {NavigationBar} from '../../components'
import moment from 'moment'
import {NavigationActions} from 'react-navigation'
import EventCard from './EventCard'
@inject('store')
@observer
export default class EventsScreen extends Component {
  constructor(props){
    super(props)
  }
    componentDidMount() {
     // this.props.navigation.state.routeName == 'full' && this.props.EventsStore.loadEvents()
    }
    loadItems(data) {
      let events = this.props.store.site._fullEvents
      return events
    }
    renderItem(item) {
      const {navigation} = this.props;
      return (<EventCard item={item}  {...{navigation}} />);
    }
    // GotoActivity(){
    //   const resetAction = NavigationActions.reset({
    //     index : 0,
    //     actions : [
    //       NavigationActions.navigate({routeName : 'events'})
    //     ]
    //   })
    //   this.props.navigation.dispatch(resetAction)
    // }
    renderEmptyDate() {
      return (
        <View style={styles.emptyDate}>
          <Text>This is empty date!</Text>
        </View>
      );
    }
  
    rowHasChanged(r1, r2) {
      return r1.name !== r2.name;
      //return false;
    }
  
    render() {
     // console.log(this.props.EventsStore)
      const {navigation} = this.props;
      const back = "Events";
      const title = "Full Calendar"
      const expanded = false
      return (
        <View style={{
          flex: 1
        }}>
          <NavigationBar {...{navigation , title , expanded ,back}}/>
          <Agenda
            markingType={'multi-dot'}
            markedDates={this.props.store.site.markedDates}
            theme={{textSectionTitleColor: 'black',
            dotColor : '#4A148C' ,
            selectedDotColor: '#ffffff',
            selectedDayBackgroundColor: '#4A148C',
            selectedDayTextColor: '#ffffff',
            dayTextColor: 'black' ,
            monthTextColor: 'black',
            agendaDayTextColor: '#4A148C',
            agendaDayNumColor: '#4A148C',
            agendaTodayColor: '#4A148C',
            agendaKnobColor: '#4A148C'}}
            items={this.props.store.site._fullEvents}
            selected={moment().format("YYYY-MM-DD")}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}/>
        </View>
      );
    }
    timeToString(time) {
      const date = new Date(time);
      return date
        .toISOString()
        .split('T')[0];
    }
  
  }
const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30
    }
});