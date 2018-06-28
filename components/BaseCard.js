// @flow
import * as React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";

import {StyleGuide, type StyleProps} from "./theme";

type BaseCardProps = StyleProps & {
    onPress?: () => mixed,
    children: React.Node
};

export default class BaseCard extends React.PureComponent<BaseCardProps> {

    render(): React.Node {
        const {style, onPress, children} = this.props;
        return (
            <TouchableOpacity {...{onPress}}>
                <View style={[styles.card, style]}>
                    {children}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#f1f1f1",
        padding: 4,
        margin: 4,
        marginTop: StyleGuide.spacing.small,
        marginBottom: 1,
     //   ...StyleGuide.styles.borderRadius,
      //  ...StyleGuide.styles.shadow
    }
});
