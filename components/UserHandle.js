import React, { Component } from 'react';
import {  View,  TouchableOpacity , StyleSheet} from 'react-native';
import {StyleGuide} from './theme'
import {Handle , Text} from './index'
import moment from 'moment'
export default class UserHandle extends Component {
  
  render() {
    const {onPress , user} =this.props;
    const light = true;
    
    return (
       user && 
       <TouchableOpacity style={styles.header} onPress={() => this.props.onPress(user.id)}>
            <View style={styles.user} >
                <Handle {...{user , light}} />
            </View>
            <Text type="footnote">{moment(150000000, "X").fromNow()}</Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: StyleGuide.spacing.tiny
    },
    user: {
        flexDirection: "row",
        alignItems: "stretch"
    },
    username: {
        justifyContent: "space-between",
        marginLeft: StyleGuide.spacing.tiny
    },
    headline: {
        lineHeight: 17
    },
    footnote: {
        lineHeight: 13
    }
});