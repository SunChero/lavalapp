import React from "react"
import { View  } from 'react-native';
import {Feed , UserHandle} from '../../components'
import {observer, inject} from 'mobx-react/native'
import moment from 'moment'


@inject('onlinestore' , 'theme') 
@observer
export default class MainView extends React.Component{
    constructor(props){
        super(props) 
        this.onPress = this.onPress.bind(this)
        this.handleColor = "black"
        this.renderItem = this.renderItem.bind(this)
    }

    onPress(user) {
        this.props.navigation.navigate("chat" , {user})
    }
    renderItem = ({item}) => <UserHandle {...{user : item , onPress :this.onPress}} />
    render(){
        const {onPress, renderItem} = this;
        const {users} = this.props.onlinestore; 
        const title = "Conversations"
        const {navigation} = this.props;
        return (
        <View style={{flex : 1}}>
            <Feed  {...{data : users, renderItem, title, navigation }} />
        </View>
        )
    }
}

