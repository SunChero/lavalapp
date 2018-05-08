// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";
import {Text, StyleGuide, Avatar, PresenceDot} from "./index";
import {observer , inject} from 'mobx-react/native'
import {observable} from 'mobx'
@inject('onlinestore')
@observer
export default class Handle extends React.Component {
    @observable user = null;
    static defaultProps = {
        handleColor: "black",
        light : true,
        size: 28
    }
    constructor(props){
        super(props)
        global.dsc.record.snapshot(this.props.user , (error, data)=> {
            this.user = data
        })
    }
    render() {
        const {handleColor  , onPress , light , size} = this.props;
        const {user} = this;
        const tmp = user ? user.id : null
        console.log('tmp is ' + tmp)
        const username = user && user.login ? user.login.username : 'undefined';
        const id  = user && user.id ? user.id : 'undefined'
        const backgroundColor = this.props.onlinestore.users.includes(tmp) ? 'green' : 'gray';
        return (
           user &&
            <View style={styles.user} >
                <Avatar uri={user.picture.thumbnail} size={size} />
                <PresenceDot backgroundColor={backgroundColor}/>
               { light && <View style={styles.username}>
                    <Text type="headline" style={styles.headline} color={handleColor}>{username}</Text>
                    <Text
                        type="footnote"
                        style={styles.footnote}
                        color={handleColor === "black" ? "#999999" : handleColor}
                    >
                        {`@${id}`}
                    </Text>
                </View>
               }
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
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: StyleGuide.spacing.tiny
    },
});
