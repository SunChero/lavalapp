import React from 'react';
import { View, Text  } from 'react-native';
import moment from 'moment';
//import {getLocations, getClientele, getTags, getActivityPage} from '../../utils'
class EventCard extends React.PureComponent {
  gotoActivity(){
    const {navigation, item} = this.props;
    navigation.navigate('activity' , {...item , ...{stream : item.id}})
    }
  

  render() {
   
                    return (
                      <View style={{flex : 1, backgroundColor: "white" , padding: 20 ,margin : 5 }}>
                        <Text>{this.props.item.locations[0] ? this.props.item.locations[0].Label : null}</Text>
                        <Text   style={{ fontWeight : '900'}}
                           onPress={() => {this.gotoActivity()}} >{this.props.item.Title}</Text>
                        <Text style={{ fontWeight : '900'}} >{moment(parseInt(this.props.item._eventDate)).format('h:mm a')}</Text>
                        <Text>{this.props.item.cost}</Text>
                      </View>
                     )
  }
}
export default EventCard;