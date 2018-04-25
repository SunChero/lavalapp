// @flow
import * as React from "react";
import {StyleSheet} from "react-native";
import {StyleGuide, Text, BaseCard} from "./index";
import PostHeader from "./PostHeader";
export default class Message extends React.PureComponent<MessageProps> {
    constructor(props){
        super(props)
        const {stream_id} = this.props
        
        console.log('constructor  ' + stream_id )
        this.post = global.dsc.record.getRecord( stream_id);
        this.post.subscribe(this.setPost.bind(this))
        this.state = {
           "post" : {},
           "user" : null
        }
    }
    componentDidMount(){
        const {stream_id} = this.props
        console.log('mounting ' + stream_id )
    }
    componentWillUnmount(){
        const {stream_id} = this.props
        console.log('unmounting ' + stream_id )
        this.post.discard()
      //  this.post.discard()
       // this.user.discard()
    }
    setUser(user){
        this.setState({
            "user" : user
        })
    }
    setPost(entry){
        this.setState({
            "post" :entry
        })
         self = this;
         global.dsc.record.snapshot(entry.user_id , (error, data)=> {
            self.setUser(data)
         })
         console.log(this.state)
         
    }
    
    render(){
        const {navigation , stream_id} = this.props;
        const {user , post } = this.state ;
        const timestamp = post ? post.timestamp : null;
        console.log('rendering')
        return (
            this.state.user &&
            <BaseCard onPress={() => navigation && navigation.navigate("Message", {})}>
                <PostHeader {...{user, timestamp}} />
                <Text style={styles.text}>{post.postData}</Text>
            </BaseCard>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        padding: StyleGuide.spacing.tiny
    }
});
