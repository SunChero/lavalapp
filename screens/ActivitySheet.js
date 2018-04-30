import * as React from "react";
import moment from 'moment'
import {StyleSheet, View ,  Modal, Dimensions , ScrollView} from "react-native";
import {Shell , NewMessage, StyleGuide, Content, Button , hasPosts, DetailsBar, NavigationBar, Text , IconButton , Icon} from '../components';
import { FloatingAction } from 'react-native-floating-action';
@hasPosts   
export default class ActivitySheet extends React.Component {

    constructor(props){
     super(props)
     this.toggleAction = this.toggleAction.bind(this)
     this.setActionRef = this.setActionRef.bind(this)
    }
    toggleAction() {
        this.ActionRef.toggle();
    }
    setActionRef(ActionRef) {
        if (ActionRef) {
            this.ActionRef = ActionRef;
        }
    }
    render() {
        const {navigation , vues } = this.props;
        const actions = [{
            text: 'Accessibility',
            icon: require('../assets/images/ic_accessibility_white.png'),
            name: 'bt_accessibility',
            position: 2
          }, {
            text: 'Language',
            icon: require('../assets/images/ic_language_white.png'),
            name: 'bt_language',
            position: 1
          }, {
            text: 'Location',
            icon: require('../assets/images/ic_room_white.png'),
            name: 'bt_room',
            position: 3
          }, {
            text: 'Video',
            icon: require('../assets/images/ic_videocam_white.png'),
            name: 'bt_videocam',
            position: 4
          }];
        const likes = this.props.likes.length
        const {Title , image , summary , locations , cost , time} = navigation.state.params;
        const back = "Events"
        const location = locations[0] ? locations[0].Label : null
        const details = [{ icon: "credit-card", caption: cost }, { icon: "clock", caption: time }];
       // const actions = [{icon: "calendar" , label : "calendar" , comp : comp}]
        const comp = () => {return <NewMessage />}
        return (
            <View style={{flex : 1 , backgroundColor: "#283355"}}>
            <ScrollView style={{flex : 1 , backgroundColor: "#283355"}}>
               
                    <View style={styles.container}>
                        <View style={styles.text}>
                            <Icon name="map-pin"  size="14"/>
                            <Text color="white" style={{fontSize: 14 , marginLeft : 5}}>{location}</Text>
                        </View>
                        
                        <Text   color="white" type="title1" >{Title}</Text>
                        <View style={{ padding: 10 , flexDirection:'row' }}>
                                <IconButton name="ios-eye-outline" type="ionicons" size="40" >
                                    <Text type="title2" style={{fontSize: 20,marginLeft:5, color:"white"}}>{vues}</Text>
                                </IconButton> 
                                <IconButton name="ios-heart-outline" type="ionicons" size="32" >
                                    <Text type="title2" style={{fontSize: 20, marginLeft:5 , color:"white"}}>{likes}</Text>
                                </IconButton>
                                <IconButton name="ios-chatbubbles-outline" type="ionicons" size="32" >
                                    <Text type="title2" style={{fontSize: 20, marginLeft:5 , color:"white"}}>{likes}</Text>
                                </IconButton>
                        </View>
                        <Text  color="white" type="footnote" style={styles.text}>{summary}</Text>
                        <DetailsBar details={details}/>

                        
                        
                       
                    </View>
                   
            </ScrollView>
             <FloatingAction actions={actions} position="right"  color="goldenrod" onPressItem={ (name) => {  console.log(`selected button: ${name}`)}   } />
            </View>
        )
    }
}
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
        gutter: {
           backgroundColor: '#283355',
      
        },
        container: {
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#283355",
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
        }

});