// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";

import {StyleGuide, Handle} from "../index";

import NotificationDot from "./NotificationDot";

import type {NavigationProps} from "../components/Navigation";

type StoryProps = NavigationProps<> & {
    read: boolean,
    uri: string,
    id: string
};

export default class Story extends React.Component {

    @autobind
    onPress() {
        const {navigation,user} = this.props;
        const stream = user;
        navigation.navigate("user", {stream});
    }

    render() {
        const {onPress} = this;
        const {user} = this.props;
        const light = false;
        const size = 40;
        return (
            <TouchableOpacity {...{onPress}}>
                <Handle {...{user, light , size}} />
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
