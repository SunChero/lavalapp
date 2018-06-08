import React from "react"
import { View ,TouchableOpacity ,Text, StyleSheet} from 'react-native';
import {Feed , Avatar, StyleGuide, PresenceDot , Handle , hasChannels , withTheme , NotificationCounter} from '../../components'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import moment from 'moment'

@inject('onlinestore')
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
       const counter = this.props.onlinestore.unreadMessages[item]
       return  <NotificationCounter {...{item , navigation , counter}} />
    }
    render(){
        const {onPress, renderItem} = this;
        const title = "Conversations"
        const {navigation} = this.props;
       // console.log(this.props.onlinestore.channels)
        return (
        <View style={{flex : 1}}>
            <Feed  {...{data : this.props.onlinestore.channels , renderItem, title, navigation }} />
           
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