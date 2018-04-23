// @flow
import * as React from "react";
import {Ionicons, Feather  as Icon} from "@expo/vector-icons";

import {StyleGuide, withTheme} from "./theme";

import type {ThemeProps} from "./theme";
import type {IconName} from "./Model";


type IconProps = ThemeProps & {
    name: IconName,
    primary?: boolean,
    secondary?: boolean,
    color: string,
    size: number
};

class IconComp extends React.PureComponent<IconProps> {

    static defaultProps = {
        color: StyleGuide.palette.darkGray,
        size: 28
    };

    render(): React.Node {
        const {theme, name, primary, secondary, color, size} = this.props;
        let iconColor: string;
        if (primary) {
            iconColor = theme.palette.primary;
        } else if (secondary) {
            iconColor = theme.palette.secondary;
        } else {
            iconColor = color;
        }
        return (
            <Icon color={iconColor} {...{name, size}} />
        );
    }
}

export default withTheme(IconComp);
