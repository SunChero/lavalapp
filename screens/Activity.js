import * as React from "react";
import {StyleSheet, View ,   Dimensions , ScrollView} from "react-native";
import { NewMessage, StyleGuide,  hasPosts, DetailsBar,  Text , IconButton , Footer, VueButton, LikeButton} from '../components';
import {Icon } from 'react-native-elements'
import { synchronizeCalendar} from '../api/functions'
@hasPosts   
export default class Activity extends React.Component {
    addReminder = ()=> {
        synchronizeCalendar(this.props.navigation.state.params)
    }
    toggleLike = (action) =>{
        //check if not user already likes this
        this.props.toggleLike(action)
    }
    render() {
        
        const {navigation , vues , likes } = this.props;
       
        const {Title , image , summary , locations , cost , time} = navigation.state.params;
        const back = "Events"
        const location = locations[0] ? locations[0].Label : null
        const details = [{ icon: "credit-card", caption: cost },{ icon: "map-pin", caption: location } ,{ icon: "clock", caption: time }];
        const comp = () => {return <NewMessage />}
        return (
            <View style={{flex : 1 , backgroundColor: "#263238"}}>
            <ScrollView style={{flex : 1 }}>
                    <View style={styles.container}>
                        <Text   color="white" type="title1" >{Title}</Text>
                        <DetailsBar details={details}/>
                        <Text  color="white" type="body" style={styles.text}>{summary}</Text>
                        <View style={{ flexDirection:'row' }}>
                                <VueButton  color="white" count={vues}/>
                                <LikeButton liked={likes.includes(global.user.name)} color="white" onLikeFunc={this.toggleLike} counter={likes.length}/>
                                <IconButton primary name="ios-chatbubbles-outline" type="ionicons" size={32}  >
                                    <Text type="title2" style={{fontSize: 20, marginLeft:5 , color: "white"}}>{likes.length}</Text>
                                </IconButton>
                           
                        </View>
                    </View>
            </ScrollView>
            <Footer >
                <Icon color="#263238" reverse reverseColor="white" name="bell-plus" raised={true} size={32} type="material-community"  onPress={this.addReminder}/>
                
            </Footer>
            </View>
        )
    }
}
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
        gutter: {
           backgroundColor: 'black',
      
        },
        container: {
            flex: 1,
            justifyContent: "center",
            marginTop: 30,
            padding : 20
        },
        avatar: {
            borderRadius: 45,
            borderWidth: 3,
            borderColor: StyleGuide.palette.white,
            marginVertical: StyleGuide.spacing.tiny
        },
        text: {
           paddingBottom: 20,
           flexDirection:'row',
        },
        content: {
            backgroundColor: '#283355',
        },
        foot :{
          backgroundColor : "#283355"
        },
        button: {
            backgroundColor : "#283355",
            marginTop:5 ,
            padding:10,
            borderRadius: 35
        }

});