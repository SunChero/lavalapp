import React, { Component } from 'react';
import {  View, Text , Button , StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons as Icon} from '@expo/vector-icons'
import {SwitchNavigator} from 'react-navigation'
import { Colors } from '../constants';


class SignalScreen extends Component {
  render() {
    return (
      <View>
        <Text>signal </Text>
      </View>
    );
  }
}

class AppsScreen extends Component {
  switchApp = () =>{
    this.props.navigation.navigate('signal')
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity   style={styles.button}   onPress={this.switchApp}  >
              <Icon name="ios-flash" size="30" color="white" style={{marginRight: 15}}/>
              <Text style={styles.text}> SIGNAL </Text>
        </TouchableOpacity>
        <TouchableOpacity   style={styles.button}   onPress={this.switchApp}  >
              <Text style={styles.text}> DEBUG </Text>
        </TouchableOpacity>
        <TouchableOpacity   style={styles.button}   onPress={this.switchApp}  >
              <Text style={styles.text}> REVERSE </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default SwitchNavigator(
  {
    home: AppsScreen,
    signal: SignalScreen/*,
    debug: DebugScreen,*/
  },{
    cardStyle:{
      backgroundColor : 'white'
    }
  }
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.tintColor,
    padding: 10,
    margin: 10,
    height:50
  },
  text :{
    fontSize: 20,
    color : 'white'
  }
  
  
})