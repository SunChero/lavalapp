// @flow
import * as React from "react";
import {View, StyleSheet} from "react-native";
import {StyleGuide, withTheme} from "./index";
import type {StyleProps, ThemeProps} from "./index";

class PresenceDot extends React.PureComponent {
 
    render(){
      
        
        const {style, theme , backgroundColor} = this.props;
        return (
            <View style={[styles.dot, { backgroundColor }, style]} />
        );
    }
}

const styles = StyleSheet.create({
    dot: {
        width: 12,
        height: 12,
        borderWidth: 2,
        borderRadius: 6,
        borderColor: StyleGuide.palette.white,

    }
});

export default withTheme(PresenceDot);
