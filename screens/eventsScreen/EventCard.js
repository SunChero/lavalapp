import React from 'react';
import { Image , View} from 'react-native';
import {
  Container, Header, Title,Content, List, ListItem, Thumbnail, Text, Body , Left , Right , Button, Card , CardItem, Icon, Badge, Item
} from 'native-base' ;// 2.3.8
//import {getLocations, getClientele, getTags, getActivityPage} from '../../utils'
class EventCard extends React.Component {
  render() {
     const {navigation, item} = this.props;
     console.log(item)
                    return (
                      <List  style={{backgroundColor:'white', margin:4}} >
                        <ListItem style={{borderBottomWidth: 0, margin:0}}>
                        <Left >
                        <Thumbnail source={{uri : this.props.item.image }}/>
                            <Body >
                              <Text style={{fontSize:12}}  >{this.props.item.Title}</Text>
                              {this.props.item.clients.length > 0  ? (
                              <ListItem style={{borderBottomWidth: 0, marginTop: -5, marginLeft:-5 }}>
                                <Icon name="ios-person-outline" style={{fontSize: 14, margin:0}}/>
                                {
                                  this.props.item.clients.map(function(client,i){
                                        return (
                                              <Text  key={i} style={{ fontSize :11}}> {client.Label}</Text>
                                        )
                                  })
                                }
                              </ListItem>
                              ) : null 
                            }
                            </Body>
                          </Left>
                        </ListItem> 
                        <ListItem style={{marginTop:-10}}>
                            <Text note>{this.props.item.summary}</Text>
                        </ListItem> 
                        { this.props.item.locations.length > 0  ? (
                            <ListItem style={{borderBottomWidth: 0, marginTop: -10 }}>
                              <Icon name="ios-pin-outline" style={{fontSize: 14}}/>
                              {
                                this.props.item.locations.map(function(location,i){
                                      return (
                                            <Text  key={i} style={{fontSize :10}}> {location.Label}</Text>
                                      )
                                })
                              }
                            </ListItem>
                            ) : null 
                          }
                          {  this.props.item.tags.length > 0  ? (
                            <ListItem style={{borderBottomWidth: 0, marginTop: -10 }}>
                              <Icon name="ios-pricetags-outline" style={{fontSize: 12}}/>
                              {
                                this.props.item.tags.map(function(tag,i){
                                      return (
                                            <Text  key={i} style={{ fontSize :10}}> {tag.Label}</Text>
                                      )
                                })
                              }
                            </ListItem>
                            ) : null 
                          }
                      </List>
                     )
  }
}
export default EventCard;