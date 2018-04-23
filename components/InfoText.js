import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';

export default class InfoText extends Component {
  render() {
      const {text} = this.props
    return (
        <View style={styles.container}>
        <Text style={styles.infoText}>{text}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: '#F4F5F4',
    },
    infoText: {
      fontSize: 16,
      marginLeft: 20,
      color: 'gray',
      fontWeight: '500',
    }
  })
