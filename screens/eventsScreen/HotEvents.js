import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import {observer, inject} from 'mobx-react/native'
import {Feed, Card} from '../../components'
import {NavigationActions} from 'react-navigation'
import moment from 'moment'


@inject('store', 'theme')
@observer
export default class HotEvents extends Component {
  constructor(props) {
    super(props)
    this.onPress = this
      .onPress
      .bind(this)
  }
  componentDidMount() {
   // this.props.navigation.state.routeName == 'hot' && this.props.EventsStore.loadEvents();
  /// console.log(this.props.store._hotEvents)
  }
  onPress(navigation) {
    this
      .props
      .navigation
      .navigate('full')
  }
 
  renderItem = (event) => {
    const {navigation} = this.props;
    if (!event.item.type) {
      return <Card   onPress={() => navigation.navigate('activity' , {...event.item , ...{stream : event.item.id}})}
        height={202} title={event.item.Title}
        picture={{ uri: event.item.image,
        preview: event.item.image
      }}/>
    }
    return <Text
      style={{
      padding: 40,
      fontSize: 30,
      fontWeight: '100',
      backgroundColor: "black",
      color: 'white'
    }}>{event.item.value}</Text>
  }
  render() {
    const {_hotEvents , _weekEvents} = this.props.store.site;
    const {onPress, renderItem} = this;
    let arr = [
      ...{}, {
        type: 'Header',
        value: 'En Vedette',
        key : 'vedette'
      },
      ..._hotEvents, {
        type: 'Header',
        value: 'This week',
        key : 'hot'
      },
      ..._weekEvents
    ]
    const title = "Evenements"
    const {navigation} = this.props;
    const rightAction = {
      icon: "ios-calendar-outline", 
      size: 30,
      type: 'ionicons',
      onPress
    };
    return (
      <View style={{ flex: 1 }}>
        <Feed {...{data : arr, renderItem, title, navigation, rightAction}}/>
      </View>
    )
  }
}
