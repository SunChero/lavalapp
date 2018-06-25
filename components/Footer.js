// @flow
import * as React from "react";
import {StyleSheet, View, SafeAreaView} from "react-native";
import {LinearGradient} from "expo";

import {StyleGuide} from "./theme";

type FooterProps = {
    children: React.Node
};

export default class Footer extends React.PureComponent<FooterProps> {
    static defaultProps= {
        direction : 'row'
    }
    render(): React.Node {
        const {children , direction ,background} = this.props;
        const justifyContent = React.Children.count(children) === 1 ? "center" : "space-between";
        return (
            <LinearGradient colors={["transparent", background || "transparent"]}>
                <SafeAreaView>
                    <View style={[styles.footer, { justifyContent  , flexDirection: direction}]}>
                        {children}
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    footer: {
       // flexDirection: "row",
        paddingHorizontal: StyleGuide.spacing.small,
        paddingVertical: StyleGuide.spacing.small
    }
});
