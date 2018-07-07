// @flow
import * as React from "react";
import autobind from "autobind-decorator";
import {SafeAreaView, View, Animated, StyleSheet} from "react-native";
import {LinearGradient} from "expo";
import Ripple from 'react-native-material-ripple'
import type {StyleObj as Style} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

import LeftAction from "./LeftAction";
import Text from "./Text";
import IconButton from "./IconButton";
import {withTheme, StyleGuide} from "./theme";
import {NavigationActions} from 'react-navigation'
import type {ThemeProps} from "./theme";
import type {NavigationProps} from "./Navigation";
import type {Action} from "./Model";

type NavigationBarType = "opaque" | "transparent";

type NavigationBarProps = ThemeProps & NavigationProps<*> & {
    title: string,
    subtitle?: string,
    type: NavigationBarType,
    titleStyle?: Style,
    back?: string,
    rightAction?: Action,
    withGradient: boolean,
    expanded: boolean,
    largeTitle: boolean
};

class NavigationBar extends React.Component<NavigationBarProps> {

    static defaultProps = {
        type: "opaque",
        title: "",
        withGradient: false,
        expanded: false
    };

    @autobind
    goBack() {
        const {navigation , route} = this.props;
        if(route) {
           return  navigation.dispatch( NavigationActions.navigate({ routeName: route }) )
        }
        navigation.goBack();
    }

    render(): React.Node {
        const {
            type, title, subtitle, theme, back, titleStyle, rightAction, withGradient, expanded, largeTitle , route
        } = this.props;
        const block = { flex: largeTitle ? 2 : 1 };
        const containerStyle = {
            backgroundColor: type === "opaque" ? theme.palette.primary : "transparent"
        };
        const navBar = (
            <SafeAreaView style={containerStyle}>
                <View style={styles.content}>
                    <View style={[styles.leftBlock]}>
                        {back && <Ripple onPress={this.goBack} ><LeftAction name="chevron-left" label={back} /> </Ripple>}
                    </View>
                    {
                        (title !== "" && !expanded) && (
                            <View style={block}>
                                <AnimatedText
                                    type="headline"
                                    color={theme.palette.secondary}
                                    align="center"
                                    style={titleStyle}
                                    numberOfLines={1}
                                >
                                    {title}
                                </AnimatedText>
                                {
                                    subtitle && (
                                        <Text
                                            type="footnote"
                                            color={theme.palette.secondary}
                                            align="center"
                                            numberOfLines={1}
                                        >
                                            {subtitle}
                                        </Text>
                                    )
                                }
                            </View>
                        )
                    }
                    <View style={styles.rightBlock}>
                        {
                            rightAction &&  rightAction.icon && (
                             <Ripple onPress={rightAction.onPress}>
                                <IconButton secondary
                                    name={rightAction.icon}
                                    type={rightAction.type}
                                    style={styles.rightAction}
                                />
                             </Ripple>
                            )
                            
                        }
                         {
                            rightAction && !rightAction.icon && (
                                <Ripple onPress={rightAction.onPress}>
                                    <Text style={{padding:10, color : 'black'}}>{rightAction.text} </Text>
                                </Ripple>
                            )
                        }
                    </View>
                </View>
                {
                    expanded && (
                        <View style={[ styles.header]}>
                            <Text type="title3" color={theme.palette.secondary}>{title}</Text>
                        </View>
                    )
                }
            </SafeAreaView>
        );
        if (withGradient) {
            return (
                <LinearGradient colors={["black", "transparent"]}>
                    {navBar}
                </LinearGradient>
            );
        }
        return navBar;
    }
}

const styles = StyleSheet.create({
    content: {
        ...StyleGuide.styles.barHeight,
        flexDirection: "row",
        alignItems: "center"
    },
    leftBlock: {
        flex: 1
    },
    rightBlock: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    header: {
        padding: StyleGuide.spacing.small
    },
    rightAction: {
        marginRight: StyleGuide.spacing.small,
        padding : 5
    }
});

const AnimatedText = Animated.createAnimatedComponent(Text);
export default withTheme(NavigationBar);
