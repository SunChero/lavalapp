// @flow
import * as React from "react";
import {StyleSheet, ScrollView} from "react-native";
import Story from "./Story";
import AddStory from "./AddStory";
import {inject , observer} from 'mobx-react/native'
import {Handle} from '../index'
@inject('onlinestore')
@observer
export default class Stories extends React.Component {
    render() {
        const {navigation } = this.props;
        const {users} = this.props.onlinestore;
        return (
            <ScrollView contentContainerStyle={styles.stories} horizontal>
              <AddStory />
                {
                    users.map(user => {
                        return (
                            <Story   {...{navigation , user}}  />
                        );
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    stories: {
        backgroundColor: '#283355',
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        height: 80
    }
});
