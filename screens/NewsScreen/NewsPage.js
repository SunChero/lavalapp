import React, { Component } from 'react';
import { Image, View, FlatList , StyleSheet , ActivityIndicator} from 'react-native';
import {observer, inject} from 'mobx-react/native'
import {Shell ,  Text , StyleGuide} from './../../components';

import moment from 'moment'
@inject('store')
@observer
export default class NewsPage extends React.PureComponent{
    render(){
        const {Title , Content , timestamp} = this.props.store.newsPage; 
        const image = this.props.store.newsPage.Image
        const title = Title
        const picture = {uri: image}
        const {navigation } = this.props;
        const description = "something"
        const height = 250
        const subtitle = Title
        const body =  <View style={{  flex: 1 , marginBottom: 50}} >
                            <Image source={{uri: image}} style={{height:202  , width: null}} />
                            <View style={{ padding: 10  }}>
                            <Text style={{padding:10}}>@{moment(timestamp).fromNow()}</Text>
                                <Text style={{ fontFamily: "SFProText-Regular" , fontSize: 18 , fontWeight: "100" }}>  {Content} </Text>
                            </View>
                        </View>
       if(!title){
            return  <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="small" color="#00ff00" />
                    </View>
        }
            return ( <Shell body={body}  {...{ timestamp, Content, title, navigation, image}} /> )
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: StyleGuide.spacing.small,
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      },
    avatar: {
        flex: 1,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: StyleGuide.palette.white,
        marginVertical: StyleGuide.spacing.tiny
    },
    text: {
        textAlign: "center",
        marginBottom: StyleGuide.spacing.tiny
    },
    content: {
        paddingBottom: StyleGuide.spacing.small
    }
});