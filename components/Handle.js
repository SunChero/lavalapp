// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";
import {Text, StyleGuide, Avatar, PresenceDot} from "./index";
import {observer , inject} from 'mobx-react/native'
import {observable} from 'mobx'

@inject('store')
export default class Handle extends React.Component {
    state =  {
        login: { username  : 'offline' },
        picture : {thumbnail : ""},
        id : null,
        loaded : false
    };
    static defaultProps = {
        handleColor: "black",
        light : true,
        size: 28
    }
    componentDidMount(){
        global.dsc.record.snapshot(this.props.user , (error, data)=> {
            Object.keys(data).length && this.setState({login : data.login , picture : data.picture , id : data.id , loaded : true})
         })
    }
    render() {
        const {handleColor  ,  light , size} = this.props;
        const backgroundColor = this.props.store.presence.users.includes(this.state.id) ? 'green' : 'gray';
       console.log(`state from render ${JSON.stringify(this.state)}`)
        return (
         <View style={styles.user} >
                <Avatar uri={this.state.picture.thumbnail} size={size} />
                <PresenceDot backgroundColor={backgroundColor}/>
               { light && <View style={styles.username}>
                    <Text type="headline" style={styles.headline} color={handleColor}>{this.state.login.username}</Text>
                    <Text
                        type="footnote"
                        style={styles.footnote}
                        color={handleColor === "black" ? "#999999" : handleColor}
                    >
                        {`@${this.state.login.username}`}
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
