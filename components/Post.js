// @flow
import * as React from "react";
import {StyleSheet} from "react-native";
import {StyleGuide, Text, BaseCard} from "./index";
import PostHeader from "./PostHeader";
import {observer} from 'mobx-react/native'
import {observable} from 'mobx'

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
         global.dsc.record.snapshot(data.user_id , (error, data)=> {
            this.user = data
         })
    }
    
    render(){
        const {navigation } = this.props;
        const {post , user} = this;
        const timestamp = post ? post.timestamp : null;
        console.log('rendering')
        return (
           user && <BaseCard onPress={() => navigation && navigation.navigate("Message", {})}>
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
