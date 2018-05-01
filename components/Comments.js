// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";
import {Text, StyleGuide, Avatar} from "./index";
export default class Comments extends React.Component {

    static defaultProps = {
        showLabel: true
    }

    render(){
        const {comments, showLabel} = this.props;
        const users = [{
            "id": "derek.russel",
            "name": "Derek Russel",
            "picture": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/8bbac5ad06b4a569b8a446825f7371c81ebac821.png?alt=media&token=73b33332-c587-464b-af68-52554221b73a",
            "caption": ""
        },
        {
            "id": "jmitch",
            "name": "Joe Mitchell",
            "picture": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/9b5cb1a55d786aebebfe7379dc16b8ccf0e81942.png?alt=media&token=6f3c5b07-1b67-478b-9b46-15cfee8d6f54",
            "caption": ""
        },
        {
            "id": "monicaa",
            "name": "Monica Dixon",
            "picture": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/a71de5589d604ece4a685c2c270267cebe192be8.png?alt=media&token=0d91856a-8a43-4b58-8e44-57becc3f34eb",
            "caption": ""
        }]
        const left = users.length === 0 ? 0 : ((-5 * (users.length - 1)) + StyleGuide.spacing.tiny);
        return (
            <View style={styles.comments}>
                {
                    users.map((user, index) => (
                        <Avatar
                            key={user.id}
                            uri={user.picture}
                            stacked={!!index}
                            style={this.computedStyle(index, users.length)}
                        />
                    ))
                }
                {
                    showLabel && <Text type="footnote" style={{ left }}>{`${comments.length} comments`}</Text>
                }
            </View>
        );
    }

    computedStyle(index: number, length: number): { left: number} {
        const {showLabel} = this.props;
        if (showLabel) {
            return { left: -5 * index };
        }
        return { left: 5 * (length - index - 1) };
    }
}

const styles = StyleSheet.create({
    comments: {
        flexDirection: "row",
        alignItems: "center"
    }
});
