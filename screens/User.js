// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View, TouchableOpacity, Platform, StatusBar} from "react-native";
import {Comments, Handle, Message, NewMessage, Image,  IconButton, ActionSheet, Content, TransparentHeader, Footer, notImplementedYet} from "../components";

import {StyleGuide} from '../components/theme'

export default class User extends React.Component{
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
        //console.log(this.props.navigation.state.params)
        if (Platform.OS === "android") {
            StatusBar.setHidden(true);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === "android") {
            StatusBar.setHidden(false);
        }
    }

    render() {
        const {navigation} = this.props;
       // const {id} = navigation.state.params;
        const story = {
            "id": "db18e45b-6ce1-40fa-b0f8-45808ff25012",
            "user": "alexandergarcia",
            "picture": {
                "uri": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/3e65bbd48387de22140814a7f948536e66dcb4c1.png?alt=media&token=90249d8f-7eaa-4aec-948e-fe9cec9a0432",
                "preview": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAYAAAD5Jg1dAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAAC30lEQVQoFQ2TTW8bZRSFn3lnPGNPxrHHruOPuonbpEmbtmoWKCVUFFTxsUOwQfQfVKzYsOendM8vQEKAIqQWNaItpSKycWWcZGwnjRPHHnu+PMO7uLuje66ec67y3WdPkr5pczQTTHJFastlRM7iwbUMH64aeHrC+JKCFmVd4oGCYS7h+THD/ozEttjTFNQgYqWgsqhLYeL4fPMqjfOpzovVNF4pjbKikasorBUUNrKCYxW0zPMRxXt1Sg+Wiao5ngZzAi3i/aLB7VqKnBSdRSD8GxGt9/J4Zsiw6zA5fEd4HBArgsMkYSBAlaOZjQYFW+PZH01aQvDRzhpOIYMuhWM/IYoSEkVBuLFJq9lj90mH2lgjqJfZupfniqXSnyV0vJi0tFdr+uc/KMOQ+pUQ9W3A+uUFqtkFdlvnWBkVQ6qO3QRNFHJU1YALN8Ztd8nuLXPw9BR9MmT78cc0Kyl+6bqIV/fv8OK3/3BHI6zaIq4zJnpzzFd3V6mOVAa/OzT+PEEk2ytMvtzgsPmaSEzx2g6lCjRqZabtAec/v6R45CC+v53hky92kMT4tbdHb+BxZ62Kabi8/aeNGI0pEyNuWXPqjSKlhztszhNKayHzsMdff+/j/DsmSY151+8gmvOI50WV8v1bfLvyAY8e1oiCKc9+7JKxBWYcst9tyawl9VkmobhR56LWYG//hMEgT2XToBe0sWR8W4UK4qou2NQk0JLJ66zNT7sj4rJFo3GJJVPF9g22MzfQ8inB3WxCS9o3vl4ndS3F6laF2WDIzMlj2CrT6SlaX3Zwx05BKSJ/tcr1RQv8UxxlTto2WbiY443PEIcyz7Mg5vplnQPP5aJ7jgjlLdJSJWE28shL8GLdELwcRpzGMdZNg5PpTBbQZzJxGR9NCccRfjhHLJvyV0J4MwhRVIOkqEsMso/+CLczInF9RFr20ZYbLRSCkYJ74GF1pkxx0S8Clm56VA2LqJnmfy88P0qmJyZ6AAAAAElFTkSuQmCC"
            },
            "comments": [
                {
                    "user": "monicaa",
                    "comment": "😍 Great shot Alex!",
                    "timestamp": 1514967242
                },
                {
                    "user": "jmitch",
                    "comment": "Dude, where did you get those sunglasses?",
                    "timestamp": 1514968622
                },
                {
                    "user": "andrea.schmidt",
                    "comment": "😎",
                    "timestamp": 1514972222
                }
            ],
            "read": false
        }
        const user = {
            "id": "monicaa",
            "name": "Monica Dixon",
            "picture": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/a71de5589d604ece4a685c2c270267cebe192be8.png?alt=media&token=0d91856a-8a43-4b58-8e44-57becc3f34eb",
            "caption": ""
        }
        const postAction = {
            label: "Post",
            onPress: notImplementedYet
        };
        return (
            <View style={styles.story}>
                <Image style={styles.image} {...story.picture} />
                <View style={styles.content}>
                    <TransparentHeader>
                        <View style={styles.topLeft}>
                            <IconButton name="x" onPress={this.goBack} style={styles.goBack} />
                            <Handle {...{user}} handleColor="white" />
                        </View>
                        <TouchableOpacity onPress={this.toggleComments}>
                            { <Comments
                                comments={story.comments.map(comment => comment.user)}
                                showLabel={false}
                            /> }
                        </TouchableOpacity>
                    </TransparentHeader>
                    <Footer>
                        <IconButton name="edit" onPress={this.toggleNewMessage} />
                    </Footer>
                    <ActionSheet title="Comments" ref={this.commentsRef}>
                        <Content style={styles.comments}>
                                {
                                    story.comments.map((msg, key) => (
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
        flex: 1
    },
    image: {
        ...StyleSheet.absoluteFillObject
    },
    content: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "space-between"
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
