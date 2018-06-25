import React from 'react';
import { View , Text } from 'react-native';
//import {getLocations, getClientele, getTags, getActivityPage} from '../../utils'
class EventCard extends React.PureComponent {
  gotoActivity(){
    const {navigation, item} = this.props;
    navigation.navigate('activity' , {...item , ...{stream : item.id}})
    }
  

  render() {
   
                    return (
                      <View style={{flex : 1}}>
                        <Text  style={{ flex : 1 , backgroundColor: "white" , padding: 20 , margin : 10}} 
                           onPress={() => {this.gotoActivity()}} >{this.props.item.Title}</Text>
                      </View>
                     )
  }
}
export default EventCard;