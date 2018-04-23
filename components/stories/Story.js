// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";

import {StyleGuide, Avatar} from "../index";

import NotificationDot from "./NotificationDot";

import type {NavigationProps} from "../components/Navigation";

type StoryProps = NavigationProps<> & {
    read: boolean,
    uri: string,
    id: string
};

export default class Story extends React.Component<StoryProps> {

    @autobind
    onPress() {
        const {navigation, id} = this.props;
        navigation.navigate("Story", { id });
    }

    render(): React.Node {
        const {onPress} = this;
        const {read, uri} = this.props;
        return (
            <TouchableOpacity {...{onPress}}>
                <View style={[styles.story, read ? styles.semiTransparent : styles.opaque]}>
                    <Avatar size={48} {...{uri}} />
                    {
                        !read && <NotificationDot style={styles.dot} />
                    }
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    story: {
        marginLeft: 10
    },
    dot: {
        position: "absolute",
        top: 0,
        right: 0
    },
    semiTransparent: {
        opacity: 0.7
    },
    opaque: {
        opacity: 1
    }
});
