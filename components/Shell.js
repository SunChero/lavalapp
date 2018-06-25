import * as React from "react";
import {ScrollView, StyleSheet, View, Animated , FlatList} from "react-native";
import {observable} from "mobx";
import {observer} from "mobx-react/native";
import {NavigationBar , IconButton , NewMessage, ActionSheet , hasPosts, Post , withTheme , StyleGuide , Text, LikeButton , VueButton} from "./index";
import moment from 'moment';

@hasPosts
@observer
class Shell extends React.Component {
    @observable scrollAnimation = new Animated.Value(0);
    constructor(props){
        super(props)
        this.onPress = this.onPress.bind(this)
        this.newPostRef = this.newPostRef.bind(this)
        this.AddPost = this.AddPost.bind(this)
        this.toggleLike = this.toggleLike.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
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
    toggleLike(action){
        console.log('toggle Like ' + action)
        //check if not user already likes this
        this.props.toggleLike(action)
    }
    onChangeHandler = (data) => {
        this.newMessage = data
    }
    render() {
        const {onPress, AddPost , scrollAnimation} = this;
        const rightAction = {          icon: "ios-create-outline", type: 'ionicons',   onPress };
        const postAction = {            label: "Save", onPress: AddPost };
        
        const {data, title, navigation, theme, back,header, body, style , vues , likes, posts} = this.props;
        const translateY = scrollAnimation.interpolate({
            inputRange: [55, 56, 57],
            outputRange: [55, 0, 0]
        });
        const onScroll = Animated.event(
            [{
                nativeEvent: {
                    contentOffset: {
                        y: scrollAnimation
                    }
                }
            }],
            { useNativeDriver: true }
        );
        const titleStyle = back ? {} : { transform: [{ translateY }] };
        const top = theme.palette.primary;
        const bottom = theme.palette.primary;
        return (
            <View style={styles.flex}>
                <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: bottom }}>
                    {  !back && ( <View style={[styles.halfFlex, { backgroundColor: top}]} /> )
                    }
                </View>
                <NavigationBar {...{ navigation, title, back, titleStyle, rightAction}}  />
                <AnimatedScrollView   contentContainerStyle={[styles.container, style]}  
                     onScroll={onScroll}  showsVerticalScrollIndicator={false}  
                     scrollEventThrottle={16} >
                    <Animated.View style={{ backgroundColor: theme.palette.primary }}>
                        <View style={styles.header}>
                            <View>{header}</View>
                            <Text type="title1" style={styles.headerText}>{title}</Text>
                            <View style={{   flexDirection:'row' }}>
                                <VueButton  color="black" count={vues}/>
                                <LikeButton liked={likes.includes(global.user.name)} color="black" onLikeFunc={this.toggleLike} counter={likes.length}/>
                                <IconButton secondary name="ios-chatbubbles-outline" type="ionicons" size={32}  >
                                    <Text type="title2" style={{fontSize: 20, marginLeft:5 , color: theme.palette.secondary}}>{posts.length}</Text>
                                </IconButton>
                            </View>
                        </View>
                    </Animated.View>
                    <View style={{flex : 1}}>{body} </View>
                    <View style={{flex: 1 , padding:10}}>
                        <FlatList extraData={this.state} data={posts} renderItem={({item}) => <Post stream={item} {...{navigation}}/>} />    
                    </View>
                </AnimatedScrollView>
                
                <ActionSheet title="Post" ref={this.newPostRef} rightAction={postAction}>
                    <NewMessage onChange={this.onChangeHandler}/>
                </ActionSheet>
                
            </View>
        );
    }
}

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    halfFlex: {
        flex: 0.5
    },
    container: {
        flexGrow: 1,
        paddingBottom: StyleGuide.spacing.small,
        backgroundColor: StyleGuide.palette.primary
    },
    header: {
        padding: StyleGuide.spacing.small
    },
    headerText: {
        color: StyleGuide.palette.secondary
    },
    extraHeader: {
        backgroundColor: StyleGuide.palette.primary,
        ...StyleGuide.styles.shadow
    },
    columnWrapperStyle: {
        marginRight: StyleGuide.spacing.small,
        marginTop: StyleGuide.spacing.small
    }
});

export default withTheme(Shell);
