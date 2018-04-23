import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import {observer, inject} from 'mobx-react/native'
import {Feed, Card, NavigationHelpers} from '../../components'
import moment from 'moment'


@inject('store', 'theme')
@observer
export default class HotEventsView extends Component {
  constructor(props) {
    super(props)
    this.onPress = this
      .onPress
      .bind(this)
  }
  componentDidMount() {
   // this.props.navigation.state.routeName == 'hot' && this.props.EventsStore.loadEvents();
   console.log(this.props.store._hotEvents)
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
      return <Card
        onPress={() => navigation.navigate('activity' , {"options" : event.item})}
        height={200}
        title={event.item.Title}
        picture={{
        uri: event.item.image,
        preview: event.item.image
      }}/>
    }
    return <Text
      style={{
      padding: 40,
      fontSize: 30,
      fontWeight: '100',
      backgroundColor: '#ae2a85',
      color: 'white'
    }}>{event.item.value}</Text>
  }
  render() {
    const {_hotEvents , _weekEvents} = this.props.store;
    console.log(_hotEvents)
    const {onPress, renderItem} = this;
    let arr = [
      ...{}, {
        type: 'Header',
        value: 'En Vedette'
      },
      ..._hotEvents, {
        type: 'Header',
        value: 'This week'
      },
      ..._weekEvents
    ]
    const title = "Evenements"
    const {navigation} = this.props;
    const rightAction = {
      icon: "calendar",
      onPress
    };
    return (
      <View style={{ flex: 1 }}>
        <Feed {...{data : arr, renderItem, title, navigation, rightAction}}/>
      </View>
    )
  }
}
