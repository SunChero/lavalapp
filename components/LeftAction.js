// @flow
import * as React from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";

import Text from "./Text";
import Icon from "./Icon";

import type {IconName} from "./Model";

type LeftActionProps = {
    name: IconName,
    label: string,
    onPress: () => void
};
export default class LeftAction extends React.PureComponent<LeftActionProps> {
    render(): React.Node {
        const {name, label, onPress} = this.props;
        return (
            <TouchableOpacity activeOpacity={0.5} underlayColor="transparent" {...{onPress}}>
                <View style={styles.backBtn}>
                    <Icon color="black" {...{name}} />
                    <Text color="black">{label}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    backBtn: {
        flexDirection: "row",
        alignItems: "center"
    }
});
