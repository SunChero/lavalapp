import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import {observer, inject} from 'mobx-react/native'
import {Feed, Card} from '../../components'
import moment from 'moment'

@inject('store', 'theme')
@observer
export default class SectorView extends Component {
  constructor(props) {
    super(props)
    this.onPress = this
      .onPress
      .bind(this)
  }
  componentDidMount() {
    this.props.navigation.state.routeName == 'sector' && this
      .props
      .store
      .loadSite();
  }
  onPress(navigation) {
    this
      .props
      .navigation
      .navigate('full')
  }
  renderItem = (event) => {
    const {navigation} = this.props;
    const sector = event.item.item;
    console.log(sector)
    return <Card
        onPress={() => navigation.navigate("event", {event})}
        height={200}
        title={sector.name}
        picture={{
        uri: sector.image,
        preview: sector.image
      }}/>
  }
  render() {
   // const {_hotEvents , _weekEvents} = this.props.store;
   const sector = this.props.navigation.state.params.event;
    const {onPress, renderItem} = this;
    sector.key = 1;
    let arr = [sector]
    const title =  sector.name
    const {navigation} = this.props;
    const rightAction = {
      icon: "calendar",
      onPress
    };
    return (
      <View style={{
        flex: 1
      }}>
        <Feed {...{data : arr, renderItem, title, navigation, rightAction}}/>
      </View>
    )
  }
}

