// @flow
import * as React from "react";
import {StyleSheet} from "react-native";
import { Text, BaseCard,Header} from "./index";
import {StyleGuide} from './theme'


type MessageProps = OptionalNavigationProps & {
    user: string,
    message: string,
    timestamp: number,
    id?: string
};

export default class Message extends React.PureComponent{

    render(){
        const {message, timestamp, navigation, id} = this.props;
        const user =  {
            "id": "jmitch",
            "name": "Joe Mitchell",
            "picture": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/9b5cb1a55d786aebebfe7379dc16b8ccf0e81942.png?alt=media&token=6f3c5b07-1b67-478b-9b46-15cfee8d6f54",
            "caption": ""
        }
        return (
            <BaseCard onPress={() => navigation && navigation.navigate("Message", { id })}>
                <Header {...{user, timestamp}} />
                <Text style={styles.text}>{message}</Text>
            </BaseCard>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        padding: StyleGuide.spacing.tiny
    }
});
