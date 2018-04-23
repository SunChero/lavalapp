// @flow
import * as React from "react";
import {TouchableOpacity, View} from "react-native";
import {Icon,  notImplementedYet} from "../index";
import {inject} from 'mobx-react/native'

const themedStyles = (theme) => ({
    addStory: {
        backgroundColor: theme.palette.secondary,
        height: 48,
        width: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: theme.spacing.small
    }
});

@inject('theme')
export default class AddStory extends React.Component {
     
    
    render() {
        //const {styles} = this.props;
        const {theme} = this.props;
        const addStory =  {
            backgroundColor: theme.palette.secondary,
            height: 48,
            width: 48,
            borderRadius: 24,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: theme.spacing.small
        }
        console.log(this.props)
        return (
            <TouchableOpacity onPress={notImplementedYet}>
                <View style={addStory}>
                    <Icon name="plus" primary />
                </View>
            </TouchableOpacity>
        );
    }
}

