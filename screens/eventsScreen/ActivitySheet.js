import * as React from "react";
import moment from 'moment'
import {StyleSheet, View , Text , Modal } from "react-native";
import {SheetView , NewMessage} from '../../components';

export default class ActivitySheet extends React.Component {

    constructor(props){
     super(props)
    }
    render() {
        const {navigation} = this.props;
        const {Title , image , summary , locations , cost , time} = navigation.state.params.options ;
        const comp = () => {return <NewMessage />}
        const actions = [{icon: "calendar" , label : "calendar" , comp : comp}]
       
        const details = [{ icon: "credit-card", caption: cost },{ icon: "map-pin", caption: locations[0].Label }, { icon: "clock", caption: time }];
        const description = summary
       
        return (
              <SheetView {...{navigation , Title , image , details, actions , description , comp }}/>
        )
    }
}
