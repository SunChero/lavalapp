import React from "react"
import { View ,TouchableOpacity ,Text, StyleSheet} from 'react-native';
import {Feed , Avatar, StyleGuide} from '../../components'
import {observer, inject} from 'mobx-react/native'
import moment from 'moment'

@inject('store' , 'theme') 
@observer
export default class MainView extends React.Component{
    constructor(props){
        super(props) 
        this.onPress = this.onPress.bind(this)
        this.handleColor = "black"
        this.renderItem = this.renderItem.bind(this)
    }

    onPress(user) {
        console.log(user)
        this.props.navigation.navigate("chat" , {user})
    }
    componentDidMount(){
       this.props.navigation.state.routeName == 'main' ?  this.props.store.loadSite() : null 
    }
    renderItem = (user) => (
        <TouchableOpacity style={styles.header} onPress={() => this.onPress(user)}>
                <View style={styles.user} >
                <Avatar uri={user.item.picture} />
                    <View style={styles.username}>
                        <Text type="headline" style={styles.headline} color={this.handleColor}>{user.item.name}</Text>
                        <Text
                            type="footnote"
                            style={styles.footnote}
                            color={"#999999"}
                        >
                            {`@${user.item.id}`}
                        </Text>
                    </View>
                </View>
                <Text type="footnote">{moment(150000000, "X").fromNow()}</Text>
        </TouchableOpacity>
    )
    render(){
        const {onPress, renderItem} = this;
        const {users} = this.props.store; 
        console.log(users)
        const title = "Conversations"
        const {navigation} = this.props;
        const rightAction = {          icon: "edit",            onPress        };
        const postAction = {            label: "Send",            onPress       };
        return (
        <View style={{flex : 1}}>
            <Feed  {...{data : users, renderItem, title, navigation,rightAction }} />
           
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