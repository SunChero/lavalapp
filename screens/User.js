// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View, TouchableOpacity, Platform, StatusBar} from "react-native";
import {Comments, Handle, Message, NewMessage, Image,  IconButton, ActionSheet, Text, Content, TransparentHeader, Footer,withTheme, hasPosts, notImplementedYet} from "../components";
import {LinearGradient} from 'expo'
import {StyleGuide} from '../components/theme'
import {observable} from 'mobx'
import {observer} from 'mobx-react/native'
@hasPosts
@observer
class User extends React.Component{
    @observable user = null;
    constructor(props){
        super(props)
        const {stream} = this.props.navigation.state.params;
        this.userRef = global.dsc.record.getRecord(stream);
        this.userRef.subscribe(this.setUser.bind(this))
    }
    setUser = (user)=>{
        this.user = user
    }
    @autobind
    goBack() {
        this.props.navigation.goBack();
    }
    @autobind
    toggleNewMessage() {
        this.newPost.toggle();
    }
    @autobind
    newPostRef(newPost) {
        if (newPost) {
            this.newPost = newPost;
        }
    }
    @autobind
    commentsRef(comments) {
        if (comments) {
            this.comments = comments;
        }
    }
    @autobind
    toggleComments() {
        this.comments.toggle();
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params)
        if (Platform.OS === "android") {
            StatusBar.setHidden(true);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === "android") {
            StatusBar.setHidden(false);
        }
        this.userRef.discard();
    }

    render() {
        const {user} = this;
        const {navigation, theme, vues, likes, posts} = this.props;
        const {stream} = navigation.state.params;
        
       
        const postAction = {
            label: "Post",
            onPress: notImplementedYet
        };
        const bottomGradient = ["transparent", "rgba(0,0,0,1)"];
       
        return (
           user && <View style={styles.story}>
                <View style={styles.content}>
                    <Image style={styles.image} uri={user.picture.large} />  
                    <View style={{position: 'absolute' , top: 0, left: 0, right: 0 }}>
                        <LinearGradient colors={bottomGradient} style={{height:150,position: 'absolute' , top: 100 , left:0 , right: 0}}>
                        </LinearGradient>
                    </View>
                    <View style={{ flex: 1 , flexDirection : 'row'}}>
                         <Text type="title1" color="white">  {user.login.username}</Text>
                        
                    </View>
                    <View style={{   flexDirection:'row' }}>
                        <IconButton primary name="ios-eye-outline" type="ionicons" size="40" >
                            <Text type="title2" style={{fontSize: 20,marginLeft:5, color: theme.palette.primary}}>{vues}</Text>
                        </IconButton> 
                        <IconButton primary name="ios-heart-outline" type="ionicons" size="32" onPress={()=> {this.AddLike()}}>
                            <Text type="title2" style={{fontSize: 20, marginLeft:5 , color: theme.palette.primary}}>{likes.length}</Text>
                        </IconButton>
                        <IconButton primary name="ios-chatbubbles-outline" type="ionicons" size="32"  >
                            <Text type="title2" style={{fontSize: 20, marginLeft:5 , color: theme.palette.primary}}>{posts.length}</Text>
                        </IconButton>
                    </View>
                    <Footer>
                        <TouchableOpacity onPress={this.toggleComments}>
                            { <Comments  comments={posts.map(comment => comment.user)}  showLabel={false}   /> }
                        </TouchableOpacity>
                        <IconButton name="edit" onPress={this.toggleNewMessage} />
                    </Footer>
                    <ActionSheet title="Comments" ref={this.commentsRef}>
                        <Content style={styles.comments}>
                                {
                                    posts.map((msg, key) => (
                                        <Message
                                            user={msg.user}
                                            timestamp={msg.timestamp}
                                            message={msg.comment}
                                            {...{key}}
                                        />
                                    ))
                                }
                            </Content>
                    </ActionSheet>
                    <ActionSheet title="New Post" ref={this.newPostRef} rightAction={postAction}>
                        <NewMessage />
                    </ActionSheet>
                </View>
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
       height: 250
    },
    content: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "space-between",
        paddingTop: 250

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