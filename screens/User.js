// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View, TouchableOpacity, Platform, StatusBar, ScrollView} from "react-native";
import {VueButton, LikeButton ,Post, Comments, NewMessage, Image,  ActionSheet, Text, Content, Footer,withTheme, hasPosts} from "../components";
import {LinearGradient} from 'expo'
import {StyleGuide} from '../components/theme'
import {observable} from 'mobx'
import {observer , inject} from 'mobx-react/native'
import { Icon } from 'react-native-elements'
import moment from 'moment'

@hasPosts
@inject('store')
@observer
class User extends React.Component{
    @observable user = null;
  
    setUser = (user)=>{
        this.user = user
    }
   
    goBack = () =>{
        this.props.navigation.goBack();
    }
   
    toggleNewMessage = () =>{
        this.newPost.toggle();
    }
  
    newPostRef = (newPost) => {
        if (newPost) {
            this.newPost = newPost;
        }
    }

    commentsRef =(comments) =>{
        if (comments) {
            this.comments = comments;
        }
    }

    toggleComments = () =>{
        this.comments.toggle();
    }
    componentDidMount() {
        const {stream} = this.props.navigation.state.params;
        this.userRef = global.dsc.record.getRecord(stream);
        this.userRef.subscribe(this.setUser.bind(this))
        
       
       
    }

    componentWillUnmount() {
        this.userRef.discard();
    }
    toggleLike = (action)=>{
        this.props.toggleLike(action)
    }
    onChangeHandler = (data) => {
        console.log( `handeling ${data}`)
        this.newMessage = data
    }
    gotoChat = () =>{
        this.props.store.chat.addPeer(this.user.id)
        this.props.navigation.navigate('chat' , {user: this.user.id})
    }
    AddPost = () =>{
        this.props.AddPost({
            'postData' : this.newMessage,
            'timestamp' : moment().unix(),
            'user_id' : global.user.name
        })
        this.newPost.toggle();
    }
    render() {
        const {user , AddPost} = this;
        const {navigation, theme, vues, likes, posts} = this.props;
        const {stream} = navigation.state.params;
        const postAction = {
            label: "Post",
            onPress:  AddPost
        };
        const bottomGradient = ["transparent", "rgba(0,0,0,1)"];
       
        return (
           user && 
           <View style={styles.story}>
                <ScrollView contentContainerStyle={styles.content}>
                    <Image style={styles.image} uri={user.picture.thumbnail} />  
                    <View style={{position: 'absolute' , bottom: 200, left: 0, right: 0 }}>
                        <LinearGradient colors={bottomGradient} style={{height:200,position: 'absolute' , top: 0 , left:0 , right: 0}}></LinearGradient>
                    </View>
                    <View style={styles.description}>
                         <Text type="title1" color="white" >{`${user.name.first} / ${user.name.last}`}</Text>
                         <Text type="subhead" color="white"  >{user.description ? user.description : 'this user has not updated their profile yet!'} </Text>
                    </View>
                    <View  style={{height: 40}}>
                        <TouchableOpacity onPress={this.toggleComments} style={{ position: 'absolute' , right: 25, top : -5}}>
                                { <Comments  comments={this.props.posts}  showLabel={false}   /> }
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                   
                    
                    <Footer>
                        <Icon color="#263238" reverse reverseColor="white" name="ios-create-outline" raised={true} size={32} type="ionicon"  onPress={this.toggleNewMessage} />
                        <TouchableOpacity onPress={this.toggleComments} style={{alignItems: 'center', justifyContent : 'center'}}>
                               
                                <View style={{  flexDirection:'row'}}>
                                    <VueButton  color="white" count={vues} />
                                    <LikeButton liked={likes.includes(global.user.name)} color="white" onLikeFunc={this.toggleLike} counter={likes.length}/>
                                </View>
                        </TouchableOpacity>
                        <Icon  color="#263238" reverse  reverseColor="white"    name="ios-chatbubbles" raised={true} type="ionicon" size={32} onPress={this.gotoChat} /> 
                    </Footer>
                    <ActionSheet title="Comments" ref={this.commentsRef}>
                        <Content style={styles.comments}>
                                {
                                    posts.map((msg, key) => (
                                        <Post stream={msg} {...{navigation , key}} /> 
                                    ))
                                }
                        </Content>
                    </ActionSheet>
                    <ActionSheet title="New Post" ref={this.newPostRef} rightAction={postAction}>
                        <NewMessage onChange={this.onChangeHandler}/>
                    </ActionSheet>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    story: {
        flex: 1,
        backgroundColor : 'black'
    },
    image: {
        top: 0,
       position: 'absolute',
       width: '100%',
       bottom: 0
    },
    description : {
        flex :1,
        padding : 20,
        justifyContent:'flex-end'
        
    },
    content: {
        ...StyleSheet.absoluteFillObject,
       // justifyContent: "space-between",
      //  paddingTop: 220

    },
    topLeft: {
        flexDirection: "row"
    },
    goBack: {
        marginRight: StyleGuide.spacing.tiny
    },
    comments: {
        paddingBottom: 40
    }
});


export default withTheme(User)