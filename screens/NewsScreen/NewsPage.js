import React, { Component } from 'react';
import { Image, View, FlatList , StyleSheet , ActivityIndicator} from 'react-native';
import {observer, inject} from 'mobx-react/native'
import {Shell ,  Text , StyleGuide} from './../../components';

import moment from 'moment'
@inject('store')
@observer
export default class NewsPage extends React.Component{
    render(){
        const {Title , Content , timestamp} = this.props.store.site.newsPage; 
        const image = this.props.store.site.newsPage.Image
        const title = Title
        const picture = {uri: image}
        const {navigation } = this.props;
        const description = "something"
        const height = 250
        const subtitle = Title
        const body =  <View style={{  flex: 1 }} >
                            <Image source={{uri: image}} style={{height:250  , width: null}} />
                            <View style={{ padding: 10  }}>
                                <Text style={{padding:10}}>@{moment(timestamp).fromNow()}</Text>
                                <Text style={{ fontFamily: "SFProText-Semibold" , fontSize: 16 }}>  {Content} </Text>
                            </View>
                            
                        </View>
       if(!title){
            return  <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="small" color="black" />
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