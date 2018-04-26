import React, { Component } from 'react';
import { Image, View, Text , FlatList} from 'react-native';
import {observer, inject} from 'mobx-react/native'
import { notImplementedYet , Feed , ActionSheet , NewMessage , Ratings, Post , Shell , withPosts} from './../../components';
import { AppLoading } from 'expo';
import moment from 'moment'

@withPosts
@inject('store') 
@observer
export default class NewsPage extends React.Component{
    constructor(props){
        super(props)
        this.onPress = this.onPress.bind(this)
        this.newPostRef = this.newPostRef.bind(this)
        this.AddPost = this.AddPost.bind(this)
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
      this.props.AddPost({
          'postData' : this.newMessage,
          'timestamp' : moment().unix(),
          'user_id' : global.user.name
      })
      this.newPost.toggle();
    }
  
    render(){
        onChangeHandler = (data) => {
            this.newMessage = data
        }
        const posts = this.props.posts;
        console.log(posts.length)
        const {onPress, AddPost} = this;
        const {Title , Content , timestamp} = this.props.store.newsPage; 
        const image = this.props.store.newsPage.Image
        const title = Title
        const {navigation} = this.props;
        const rightAction = {          icon: "edit",   onPress };
        const postAction = {            label: "Save", onPress: AddPost };
        let header = 
            <View style={{flex : 1}}>
                <Image   source={{uri: image }} style={{  height: 230, width: null,  flex: 1  }} /> 
            </View>          
        const body =    <View style={{  flex: 1 , marginBottom: 50}} >
                            <View style={{ padding: 10  }}>
                                <Text>{moment(timestamp).fromNow()}</Text>
                            </View>
                            <View style={{ padding: 10  }}>
                                <Text style={{ fontFamily: "SFProText-Regular" , fontSize: 18 , fontWeight: "100" }}>  {Content} </Text>
                            </View>
                            <FlatList extraData={this.state} data={posts} renderItem={({item}) => <Post stream_id={item} />} />
                            <ActionSheet title="Post" ref={this.newPostRef} rightAction={postAction}>
                                <NewMessage onChange={onChangeHandler}/>
                            </ActionSheet>
                        </View>
       if(!title){
            return <AppLoading />
        }
            return (
                <Shell 
                    header={header}
                    body={body}
                {...{ timestamp, Content, posts, title, navigation, image, postAction, rightAction}} />
            )
    }
}