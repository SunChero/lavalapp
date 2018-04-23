// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {Text, StyleGuide, Avatar} from "./index";



type HandleProps = {
    user: User,
    handleColor: string
};

export default class Handle extends React.PureComponent<HandleProps> {

    static defaultProps = {
        handleColor: "black"
    }

    render(): React.Node {
        const {user, handleColor} = this.props;
        console.log('HANDLE' + user)
        return (
            <View style={styles.user}>
                <Avatar uri={user.picture} />
                <View style={styles.username}>
                    <Text type="headline" style={styles.headline} color={handleColor}>{user.name_}</Text>
                    <Text
                        type="footnote"
                        style={styles.footnote}
                        color={handleColor === "black" ? "#999999" : handleColor}
                    >
                        {`@${user.id_}`}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    user: {
        flexDirection: "row",
        alignItems: "stretch"
    },
    username: {
        justifyContent: "space-between",
        marginLeft: StyleGuide.spacing.tiny
    },
    headline: {
        lineHeight: 17
    },
    footnote: {
        lineHeight: 13
    }
});
