import React, { Component } from 'react';
import {  View, Text, ScrollView , StyleSheet } from 'react-native';
import { NavigationBar, InfoText } from '../../components';
import Ripple from 'react-native-material-ripple'
import {ListItem} from 'react-native-elements'


export default class Calendar extends React.Component {
  

    state ={
        active : this.props.navigation.state.params.user.get('sync')
    }
    toggle = category =>{
        let cats = this.state.active
        if(this.state.active.includes(category)){
            this.setState({"active" : this.state.active.filter(c => c != category)})
        }
        else {
            this.setState({"active" : [...this.state.active , category]})
            
        }
      
    }
    sync = () =>{
        this.props.navigation.state.params.user.set('sync' , this.state.active)
        this.props.navigation.goBack()
    }
  render() {
      const title = "Calendar Sync Options"
      const back = "settings"
      const {navigation} = this.props;
      const {categories }=  navigation.state.params;
    return (
        <View style={{flex :  1 , backgroundColor:'white'}}>
        <NavigationBar {...{navigation , title , back}} />
        <View style={{flex: 1}}>
            <ScrollView >
                    {
                   categories.map( cat =>(
                    <ListItem switchButton  hideChevron 
                    title={cat.Label}
                    switched={this.state.active.includes(cat.Id)}   
                    onSwitch={() =>{this.toggle(cat.Id)}} 
                    containerStyle={styles.listItemContainer}
                   
                  />
                ))
                } 
                    <Ripple style={{backgroundColor: "black", padding:20, margin: 10, alignItems:'center', justifyContent: 'center'}}  onPress={this.sync}>
                        <Text style={{color: 'white'}}>Save</Text> 
                    </Ripple>
            </ScrollView>
           
        </View>
     </View>
    );
  }
}
const styles = StyleSheet.create({
     
        listContainer: {
          marginBottom: 0,
          marginTop: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          backgroundColor: '#fff'
        },
        listItemContainer: {
          fontWeight: '900' ,
          color : 'black',
          borderBottomWidth: 0,
          backgroundColor:"#fcfcfc"
        },
       
    })