// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import Icon from "./Icon";
import Text from "./Text";
import {StyleGuide} from "./theme";

import type {IconName} from "./Model";

type Detail = {
    icon?: IconName,
    comp?: React.Node,
    caption: string
};

type DetailsBarProps = {
    details: Detail[]
};

export default class DetailsBar extends React.PureComponent<DetailsBarProps> {

    render(): React.Node {
        return (
            <View style={styles.details}>
                {
                    this.props.details.map((detail, key) => (
                        <View style={[styles.item, {backgroundColor : this.props.color}]} {...{key}}>
                            <View style={styles.icon}>
                                {detail.icon && <Icon name={detail.icon}  color="white"/>}
                                {detail.comp}
                            </View>
                            <Text type="footnote" style={styles.caption}
                                primary
                            >
                                {detail.caption}
                            </Text>
                        </View>
                    ))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    details: {
        flexDirection: "row",
        zIndex: 100,
     
    },
    item: {
        flex: 1,
        padding: StyleGuide.spacing.small,
        alignItems: 'flex-start',
       
    },
    icon: {
        height: 30,
        justifyContent: "center",
    },
    caption: {
        marginTop: StyleGuide.spacing.tiny,
        justifyContent:'center',
        alignItems: 'center',
        alignContent : "center",
        color: "white"
    }
});
