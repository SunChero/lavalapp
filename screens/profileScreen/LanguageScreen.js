import React, { Component } from 'react';
import {  View, Text, FlatList, TouchableOpacity} from 'react-native';
import { NavigationBar , InfoText} from '../../components';
import { inject } from 'mobx-react/native';

@inject('store')
export default class Language extends Component {
   
    _onPress = (item) => {
        const {navigation} = this.props;
        console.log(item)
        this.props.store.user.set("language" ,item.title)
       navigation.navigate('main')
    }
    _renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this._onPress(item)} >
                <View style={{backgroundColor: 'white' , padding:15}}>
                    <Text>{item.title}</Text>
                </View>
        </TouchableOpacity>
      );
  render() {
      const {data , navigation , title , back } = this.props;
    return (
      <View style={{flex : 1}}>
      <NavigationBar {...{navigation : this.props.navigation, title : 'Setup Language' , back : true}} />
      <View style={{flex : 1 , justifyContent: 'center',}}>
      <InfoText text="Language" />
      <FlatList
            data={[{title: 'Francais', key: '0'},{title: 'English', key: '1'} ]}
            renderItem={this._renderItem}
            />
      </View>
      </View>
    );
  }
}
