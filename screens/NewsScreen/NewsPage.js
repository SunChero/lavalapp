import React, { Component } from 'react';
import { Image, View, FlatList , StyleSheet} from 'react-native';
import {observer, inject} from 'mobx-react/native'
import { Avatar,notImplementedYet , ActionSheet , NewMessage , Post , Shell , hasPosts , IconButton , Card , Text , StyleGuide} from './../../components';
import { AppLoading } from 'expo';
import moment from 'moment'
@hasPosts
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
      this.props.AddLike()
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
        const picture = {uri: image}
        const {navigation , vues} = this.props;
        const rightAction = {          icon: "edit",   onPress };
        const postAction = {            label: "Save", onPress: AddPost };
        const description = "something"
        const height = 250
        const subtitle = Title
        const likes = this.props.likes.length
       // let header = <Avatar uri={image} size={90} style={styles.avatar} />
            
                   
        const body =    <View style={{  flex: 1 , marginBottom: 50}} >
                            <Image source={{uri: image}} style={{height:202  , width: null}} />
                            <View style={{ padding: 10  }}>
                            <Text style={{padding:10}}>@{moment(timestamp).fromNow()}</Text>
                                <Text style={{ fontFamily: "SFProText-Regular" , fontSize: 18 , fontWeight: "100" }}>  {Content} </Text>
                            </View>
                            <FlatList extraData={this.state} data={posts} renderItem={({item}) => <Post stream={item} />} />
                            <ActionSheet title="Post" ref={this.newPostRef} rightAction={postAction}>
                                <NewMessage onChange={onChangeHandler}/>
                            </ActionSheet>
                        </View>
       if(!title){
            return <AppLoading />
        }
            return (
                <Shell 
                   
                    body={body}
                {...{ timestamp, Content, posts, title, navigation, image, postAction, rightAction, vues , likes}} />
            )
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: StyleGuide.spacing.small,
        flex: 1,
        justifyContent: "center"
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