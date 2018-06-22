import React from "react"
import { View ,TouchableOpacity ,Text, StyleSheet} from 'react-native';
import {Feed , Avatar, StyleGuide, PresenceDot , Handle , hasconversations , withTheme , NotificationCounter} from '../../components'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import moment from 'moment'

@inject('store')
@observer
class MainView extends React.Component{
    constructor(props){
        super(props) 
        this.handleColor = "black"
    }
    componentDidMount = () => {
        global.waitingMessages = 0;
    } 
    renderItem = ({item}) => {
       const {navigation} = this.props;
       const counter = this.props.store.notifications.get(item)
       return  <NotificationCounter {...{item , navigation }} />
    }
    render(){
        const {onPress, renderItem} = this;
        const title = "Conversations"
        const {navigation} = this.props;
        return (
        <View style={{flex : 1}}>
            <Feed  {...{data : this.props.store.chat.peers , renderItem, title, navigation }} />
        </View>
        )
    }
}


const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: StyleGuide.spacing.tiny
    },
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


export default withTheme(MainView)