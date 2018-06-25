// @flow
import * as React from "react";
import {StyleSheet, View , FlatList} from "react-native";
import {Text, StyleGuide, Avatar , Icon} from "../../components";

export default class Alert extends React.Component {

    renderItem(obj){
        const alert = obj.item 
        return (
            <View style={{backgroundColor: 'black'}}>
                
                <View style={{padding : 20,     flex :1}}>
                    <Text  color="white" style={{fontSize: 20}}>{alert.Descr}</Text>
                    {
                        alert.WarningInfos.map((item , i ) =>  {
                            return (
                                <View key={i} style={{flex : 1 , flexDirection : 'row' , padding: 10}}>
                                    <Icon name="ios-alert"  type="ionicons" color="white" style={{ flex :1}} />
                                    <Text style={{flex :4 , color :'white', marginLeft:10}}> {`${item.Title}`} </Text>
                                </View>
                         )})
                    }
                </View>
            </View>
        );
    }
    render(){
        const renderItem = this.renderItem
        const {alerts} = this.props;
        return  <FlatList data={alerts} renderItem={renderItem} keyExtractor={(item, index) => index}/>
        
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
