// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";
import {Text, StyleGuide, Avatar, PresenceDot} from "./index";
import {observer , inject} from 'mobx-react/native'
import {observable} from 'mobx'

@inject('onlinestore')
@observer
export default class Handle extends React.Component {
    static defaultProps = {
        handleColor: "black"
    }
    render() {
        const {user, handleColor } = this.props;
        const tmp = user.id
        console.log(tmp)
        console.log(user)
        const backgroundColor = this.props.onlinestore.users.includes(tmp) ? 'green' : 'gray';
        console.log(this.props.onlinestore.users)
        return (
            <View style={styles.user} >
                <Avatar uri={null} />
                <PresenceDot  user={user} backgroundColor={backgroundColor}/>
                <View style={styles.username}>
                    <Text type="headline" style={styles.headline} color={handleColor}>{null}</Text>
                    <Text
                        type="footnote"
                        style={styles.footnote}
                        color={handleColor === "black" ? "#999999" : handleColor}
                    >
                        {`@${null}`}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    user: {
        flexDirection: "row",
        alignItems: "stretch"
    },
    username: {
        justifyContent: "space-between",
        marginLeft: StyleGuide.spacing.tiny
    },
    headline: {
        lineHeight: 17
    },
    footnote: {
        lineHeight: 13
    }
});
