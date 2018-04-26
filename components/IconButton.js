// @flow
import * as React from "react";
import {TouchableOpacity, View} from "react-native";

import Icon from "./Icon";
import {withTheme} from "./theme";

import type {IconName} from "./Model";
import type {ThemeProps, StyleProps} from "./theme";
import { FontAwesomeasIcon } from '@expo/vector-icons';

type IconButtonProps = StyleProps & ThemeProps & {
    onPress: () => mixed,
    name: IconName,
    color: string,
    primary: boolean,
    secondary: boolean,
    backgroundPrimary: boolean,
    rounded: boolean,
    disabled: boolean
};

class IconButton extends React.PureComponent<IconButtonProps> {

    static defaultProps = {
        color: "white",
        backgroundPrimary: false,
        primary: false,
        secondary: false,
        rounded: false,
        disabled: false
    }

    render(): React.Node {
        const {
           size, onPress, name, theme, backgroundPrimary, primary, secondary, rounded, color: defaultColor, disabled , type
        } = this.props;
        const style = [{ opacity: disabled ? 0.5 : 1 }];
        if (rounded) {
            style.push({
                flex: 1,
                borderRadius: 14,
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                fontSize: 25,
                margin: 5,
                padding: 10
            });
        }
        if (backgroundPrimary) {
            style.push({
                backgroundColor: theme.palette.primary
            });
        }
        let color: string;
        if (primary) {
            color = theme.palette.primary;
        } else if (secondary) {
            color = theme.palette.secondary;
        } else {
            color = defaultColor;
        }
        style.push(this.props.style);
        const Btn = disabled ? View : TouchableOpacity;
        return (
            <Btn {...{onPress}}>
                <View style={{ flex: 1 , alignItems: 'center' , flexDirection: 'row', justifyContent: 'center' , width: 50 , height: 50 , marginLeft: 10,}}>
                    <Icon {...{name, color ,size, type}} />
                    {this.props.children}
                </View>
            </Btn>
        );
    }
}

export default withTheme(IconButton);
