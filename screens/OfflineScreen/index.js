import * as React from "react";
import {StyleSheet, View } from "react-native";
import {Text ,  Footer} from '../../components';
import {Icon } from 'react-native-elements'
   
export default class OfflineScreen extends React.Component {
    render() {
        return (
            <View style={{flex : 1 , backgroundColor: "#263238"}}>
                    <View style={styles.container}>
                    </View>
                    <Footer >
                        <Icon color="#263238" reverse reverseColor="white" name="bell-plus" raised={true} size={32} type="material-community" />
                    </Footer>
            </View>
        )
    }
}

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