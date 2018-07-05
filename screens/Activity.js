import * as React from "react";
import {StyleSheet, View ,  TouchableOpacity, Platform, Button , ScrollView} from "react-native";
import { VueButton, LikeButton ,Post, Comments, NewMessage, Image,  ActionSheet, Text, Content, Footer,withTheme, hasPosts} from '../components';
import {Icon } from 'react-native-elements'
import {LinearGradient} from 'expo'
import {StyleGuide} from '../components/theme'
import { synchronizeCalendar} from '../api/functions'
import { inject, observer } from "mobx-react/native";
import moment from 'moment'

@hasPosts
@inject('store')   
@observer
class Activity extends React.Component {
    addReminder = ()=> {
        synchronizeCalendar(this.props.navigation.state.params)
    }
    componentDidMount = () => {
       console.log(this.props.navigation.state.params)
    }
    goBack = () =>{
        this.props.navigation.goBack();
    }
    toggleNewMessage = () =>{
        this.newPost.toggle();
    }
    toggleSyncCal = () =>{
        this.syncCal.toggle();
    }
    syncCalRef = (syncCal) => {
        if (syncCal) {
            this.syncCal = syncCal;
        }
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
    
    toggleLike = (action) =>{
        //check if not user already likes this
        this.props.toggleLike(action)
    }
    onChangeHandler = (data) => {
        this.newMessage = data
    }
    toggleComments = () =>{
        this.comments.toggle();
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
        const {AddPost} = this;
        const {navigation, theme, vues, likes, posts} = this.props;
        const postAction = {
            label: "Post",
            onPress:  AddPost
        };
        
        console.log(`rendering posts ${posts}`)
        const {Title , image , _summary , locations , cost , _eventDate} = navigation.state.params;
        const back = "Events"
        const location = locations[0] ? locations[0].Label : null
        const bottomGradient = ["transparent", "rgba(0,0,0,1)"];
        return (
          posts &&  <View style={styles.story}>
                <View style={styles.content}>
                    
                    <ScrollView contentContainerStyle={styles.scroll}>
                    <Image style={styles.image} uri={image} />  
                    <View style={{flex: 1}}>
                        <LinearGradient colors={bottomGradient} style={{height:100,position: 'absolute' , top: 100 , left:0 , right: 0}}></LinearGradient>
                        
                    </View>
                    <View style={styles.description}>
                            <Text type="title1" color="white">{moment(parseInt(_eventDate)).format('h:mm a').toUpperCase()}</Text>
                         <Text type="title3" color="white" >{`${location}`}</Text>
                         
                         <Text type="caption" color="white" >{`${cost}`}</Text>
                         <Text type="footnote" color="white"  >{_summary} </Text>
                    </View>
                   </ScrollView>
                    <Footer>
                        <Icon color="#263238" reverse reverseColor="white" name="ios-alarm-outline" raised={true} size={32} type="ionicon"  onPress={this.toggleSyncCal} />
                        <TouchableOpacity onPress={this.toggleComments} style={{alignItems: 'center', justifyContent : 'center'}}>
                                { <Comments  comments={posts}  showLabel={false}   /> }
                                <View style={{  flexDirection:'row'}}>
                                    <VueButton  color="white" count={vues} />
                                    <LikeButton liked={likes.includes(global.user.name)} color="white" onLikeFunc={this.toggleLike} counter={likes.length}/>
                                </View>
                        </TouchableOpacity>
                        <Icon  color="#263238" reverse  reverseColor="white"    name="ios-chatboxes-outline" raised={true} type="ionicon" size={32} onPress={this.toggleNewMessage} /> 
                    </Footer>
                    <ActionSheet title="Comments" ref={this.commentsRef}>
                        <Content style={styles.comments}>
                                {
                                     posts.map((comment, key) => (
                                        <Post stream={comment} {...{navigation , key}} /> 
                                    ))
                                }
                        </Content>
                    </ActionSheet>
                    <ActionSheet title="New Post" ref={this.newPostRef} rightAction={postAction}>
                        <NewMessage onChange={this.onChangeHandler}/>
                    </ActionSheet>
                    <ActionSheet title="Alarm Setup" ref={this.syncCalRef} >
                            <View style={{height: 180, padding : 20}}>
                                <Text>this will setup an alarm, by adding this event to your phone's calendar</Text>
                                <TouchableOpacity style={{backgroundColor: "#4A148C", padding:15, marginTop: 20}}>
                                    <Button title="Remind Me" color="white" onPress={this.addReminder} > </Button>
                                </TouchableOpacity>
                            </View>
                        
                    </ActionSheet>
                   
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    story: {
        flex: 1,
        backgroundColor : 'black'
    },
    scroll : {
        position : 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    image: {
        top: 0,
       position: 'absolute',
       width: '100%',
       height: 200
    },
    description : {
         flex :1,
        // zIndex: 30,
         marginTop: 200,
         padding : 20,
        justifyContent:'flex-start'
        
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


export default withTheme(Activity)