// @flow
import moment from "moment";
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {Text, StyleGuide} from "./index";

import Handle from "./Handle";



export default class PostHeader extends React.PureComponent{

    render() {
        const {user, timestamp } = this.props;
        return (
            <View style={styles.header}>
                <Handle {...{user }} />
                <Text type="footnote">{moment(timestamp, "X").fromNow()}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: StyleGuide.spacing.tiny
    }
});
