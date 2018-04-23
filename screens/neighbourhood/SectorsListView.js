import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import {observer, inject} from 'mobx-react/native'
import {Feed, Card , Stories} from '../../components'
import moment from 'moment'

@inject('store', 'theme')
@observer
export default class SectorsListView extends Component {
  constructor(props) {
    super(props)
    this.onPress = this
      .onPress
      .bind(this)
  }
  componentDidMount() {
    //this.props.navigation.state.routeName == 'sectors' && this.props.store.loadSite();
  }
  onPress(navigation) {
    this.props.navigation.navigate('full')
  }
  renderItem = (event) => {
    const {navigation} = this.props;
      return <Card
        onPress={() => navigation.navigate("sector", {event})}
        height={200}
        title={event.item.name}
        picture={{
        uri: event.item.image,
        preview: event.item.image
      }}/>
  }
  render() {
    const {secteurs} = this.props.store.site;
    const {onPress, renderItem} = this;
    const title = "NeighbourHood"
    const {navigation} = this.props;
     return (
      <View style={{flex: 1}}>
        <Feed 
          header={<Stories {...{navigation}} />}
          {...{data :secteurs, renderItem, title, navigation }}/>
      </View>
    )
  }
}