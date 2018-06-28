import * as React from "react";
import {StyleSheet, View ,  TouchableOpacity, Platform, StatusBar , ScrollView} from "react-native";
import { VueButton, LikeButton ,Post, Comments, NewMessage, Image,  ActionSheet, Text, Content, Footer,withTheme, hasComments} from '../components';
import {Icon } from 'react-native-elements'
import {LinearGradient} from 'expo'
import {StyleGuide} from '../components/theme'
import { synchronizeCalendar} from '../api/functions'
import { inject, observer } from "mobx-react/native";
import moment from 'moment'

@hasComments
@inject('store')   
@observer
class Activity extends React.Component {
    addReminder = ()=> {
        synchronizeCalendar(this.props.navigation.state.params)
    }
    componentDidMount = () => {
       // console.log(this.props.navigation.state.params)
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
    AddComment = () =>{
        this.props.AddComment({
            'postData' : this.newMessage,
            'timestamp' : moment().unix(),
            'user_id' : global.user.name
        })
        this.newPost.toggle();
    }
    render() {
        const {AddComment} = this;
        const {navigation, theme, vues, likes, comments} = this.props;
        const postAction = {
            label: "Post",
            onPress:  AddComment
        };
        
        const {Title , image , summary , locations , cost , _eventDate} = navigation.state.params;
        const back = "Events"
        const location = locations[0] ? locations[0].Label : null
        const bottomGradient = ["transparent", "rgba(0,0,0,1)"];
        return (
            <View style={styles.story}>
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
                         <Text type="footnote" color="white"  >{summary} </Text>
                    </View>
                   </ScrollView>
                    <Footer>
                        <Icon color="#263238" reverse reverseColor="white" name="bell-plus" raised={true} size={32} type="material-community"  onPress={this.addReminder} />
                        <TouchableOpacity onPress={this.toggleComments} style={{alignItems: 'center', justifyContent : 'center'}}>
                                { <Comments  comments={this.props.comments}  showLabel={false}   /> }
                                <View style={{  flexDirection:'row'}}>
                                    <VueButton  color="white" count={vues} />
                                    <LikeButton liked={likes.includes(global.user.name)} color="white" onLikeFunc={this.toggleLike} counter={likes.length}/>
                                </View>
                        </TouchableOpacity>
                        <Icon  color="#263238" reverse  reverseColor="white"    name="comment-alert" raised={true} type="material-community" size={32} onPress={this.toggleNewMessage} /> 
                    </Footer>
                    <ActionSheet title="Comments" ref={this.commentsRef}>
                        <Content style={styles.comments}>
                                {
                                     comments.map((comment, key) => (
                                        <Post stream={comment} {...{navigation , key}} /> 
                                    ))
                                }
                        </Content>
                    </ActionSheet>
                    <ActionSheet title="New Post" ref={this.newPostRef} rightAction={postAction}>
                        <NewMessage onChange={this.onChangeHandler}/>
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