// @flow
import * as React from "react";
import {StyleSheet} from "react-native";
import {StyleGuide, Text} from "./index";
import PostHeader from "./PostHeader";
import {observer , inject} from 'mobx-react/native'
import {observable} from 'mobx'
import Ripple from "react-native-material-ripple"
@observer
export default class Message extends React.Component<MessageProps> {
    @observable user = null;
    @observable post = null;
   
    constructor(props){
        super(props)
        const {stream} = this.props;
        const id = stream ? stream : this.props.navigation.state.params.stream;
        this.postRef = global.dsc.record.getRecord(id);
        this.postRef.subscribe(this.setPost.bind(this))
    }
    
    componentWillUnmount(){
        this.postRef.discard()
    }
    
    setPost(data){
        this.post = data
        this.user = data.user_id
        //  global.dsc.record.snapshot(data.user_id , (error, data)=> {
        //     this.user = data
        //  })
    }
    
    render(){
        const {navigation , transparent, reverse } = this.props;
        const {post , user } = this;
        const timestamp = post ? post.timestamp : null;
        return (
           user && <Ripple style={reverse ? {backgroundColor: "rgba(122, 122, 122, 0.09)" } : null} onPress={() => navigation.navigate("user", {stream : user})}>
                <PostHeader {...{user,timestamp, reverse}} />
                <Text style={[styles.text, reverse? {color : "white"} : null]}>{post.postData}</Text>
            </Ripple>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        padding: StyleGuide.spacing.tiny
    }
});
