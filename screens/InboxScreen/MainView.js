import React from "react"
import { View ,TouchableOpacity ,Text, StyleSheet , ScrollView} from 'react-native';
import {Feed , Avatar, StyleGuide, PresenceDot , Handle , hasconversations , withTheme , NotificationCounter, EmptyShell} from '../../components'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import moment from 'moment'

@inject('store')
@observer
class MainView extends React.Component{
   
    render(){
     
        const title = "Conversations"
        const {navigation} = this.props;
        const back =false
        return (
           
            <EmptyShell {...{title , navigation ,back}}>
                <View style={{flex :1}}>
                    {this.props.store.chat.peers.map(item => <NotificationCounter {...{item , navigation }} />)}
                </View>
            </EmptyShell>
            
       
        
        )
    }
}


    const styles = StyleSheet.create({
        flex: {
            flex: 1
        },
        halfFlex: {
            flex: 0.5
        },
        container: {
            flexGrow: 1,
            paddingBottom: StyleGuide.spacing.small,
            backgroundColor: StyleGuide.palette.primary
        },
        header: {
            padding: StyleGuide.spacing.small
        },
        headerText: {
            color: StyleGuide.palette.secondary
        },
        extraHeader: {
            backgroundColor: StyleGuide.palette.secondary,
            ...StyleGuide.styles.shadow
        },
        columnWrapperStyle: {
            marginRight: StyleGuide.spacing.small,
            marginTop: StyleGuide.spacing.small
        }
    })



export default withTheme(MainView)