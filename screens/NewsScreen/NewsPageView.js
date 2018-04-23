import React, { Component } from 'react';
import {  View, Text,Image } from 'react-native';
import {observer, inject} from 'mobx-react/native'
import { notImplementedYet , Feed , ActionSheet , NewMessage , Ratings, withStreams , Post } from './../../components';
import { AppLoading } from 'expo';
import moment from 'moment'

@withStreams
@inject('store') 
@observer
export default class NewsPageView extends React.Component{
    constructor(props){
        super(props)
        this.onPress = this.onPress.bind(this)
        this.newPostRef = this.newPostRef.bind(this)
        this.AddPost = this.AddPost.bind(this)
        console.log(global.dsc.getConnectionState())
    }
    onPress() {
        this.newPost.toggle();
    }
   
    newPostRef(newPost) {
        if (newPost) {
            this.newPost = newPost;
        }
    }
    AddPost = () =>{
    console.log('calling AddPost')
      this.props.AddPost({
          'postData' : this.newMessage,
          'timestamp' : moment().unix(),
          'user_id' : global.user.name
      })
      this.newPost.toggle();
    }
    renderItem = ({item}) => {
       const posts = this.props.stream;
       console.log(posts)
        return (
            <View style={{  flex: 1 , marginBottom: 50}} >
                <View>
                    <View>
                        <Image  source={{ uri: item.Image   }}
                        style={{  height: 230, width: null,  flex: 1  }}/>
                    </View>
                    <View style={{  padding: 10 }}>
                        <Text style={{ color: "#283355" ,fontFamily: "SFProText-Semibold" , fontSize: 25  }}>{item.Title} </Text>
                    </View>
                   
                    
                    <View style={{ padding: 10  }}>
                        <Text>{moment(item.timestamp).fromNow()}</Text>
                    </View>
                    <View style={{ padding: 10  }}>
                        <Text style={{ fontFamily: "SFProText-Regular" , fontSize: 18 , fontWeight: "100" }}>  {item.Content} </Text>
                    </View>
                    <View style={{ padding: 10  }}>
                    { posts && posts.map(post => <Post  stream_id={post} />)}
                        
                    </View>
                    
                </View>
            </View>
        )
    }
    render(){
        onChangeHandler = (data) => {
            console.log('passed change' + data)
            this.newMessage = data
        }
       
        
        const posts = this.props.stream;
        let newMessage = "Empty"
        const {onPress, renderItem , AddPost} = this;
        const page = this.props.store.newsPage; 
        const pageArray = [page]
        const title = page.Title
        const {navigation} = this.props;
        const rightAction = {          icon: "edit",            onPress        };
        const postAction = {            label: "Save",            onPress: AddPost        };
        const expanded = true;
        pageArray.id = title;
        pageArray.key  = pageArray.id
       if(Object.keys(page).length === 0 && page.constructor === Object){
            return <AppLoading />
        }
        
            return (
            <View style={{flex : 1}}>
                <Feed  {...{data : pageArray, renderItem, title, navigation, rightAction}} />
                    <ActionSheet title="Post" ref={this.newPostRef} rightAction={postAction}>
                        <NewMessage onChange={onChangeHandler}/>
                    </ActionSheet>
                </View>
            )
    
   
    }
}