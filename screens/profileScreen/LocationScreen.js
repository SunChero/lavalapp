import React, { Component } from 'react';
import {  View, Text, FlatList, TouchableOpacity} from 'react-native';
import { NavigationBar , InfoText} from '../../components';
import { inject } from 'mobx-react/native';

@inject('store')
export default class Location extends Component {
    
    _onPress = (item) => {
        const {navigation} = this.props;
        this.props.store.user.set("city" , item.title)
        navigation.navigate('main')
    }
    _renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this._onPress(item)} >
                <View style={{backgroundColor: 'white' , padding:15, borderBottomColor: '#ECECEC'}}>
                    <Text>{item.title}</Text>
                </View>
        </TouchableOpacity>
      );
  render() {
      const {navigation , title , back } = this.props;
      const data = [
        {title: 'Laval', key: '0'},
        {title: 'Montreal', key: '1'},
        {title: 'Gatineau', key: '2'},
        {title: 'Quebec', key: '3'},
      ]
    return (
      <View style={{flex : 1}}>
      <NavigationBar {...{navigation : this.props.navigation, title : 'Setup Language' , back : true}} />
      <View style={{flex : 1 , justifyContent: 'center',}}>
      <InfoText text="Language" />
      <FlatList
            data={data}    renderItem={this._renderItem}
            />
      </View>
      </View>
    );
  }
}
