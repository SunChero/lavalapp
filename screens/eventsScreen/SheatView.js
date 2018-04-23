import * as React from "react";
import moment from 'moment'
import {StyleSheet, View , Text , ScrollView} from "react-native";
import {
    PayButton, QuantityInput, DatePicker, ReservationSheat, Container, Header, NavigationBar, DetailsBar, Content, List, Button, ActionSheet, StyleGuide, notImplementedYet, Card
} from "../../components";

export default class SheatView extends React.Component {

    constructor(props){
        super(props)
        this.toggleReservation = this.toggleReservation.bind(this)
        this.setReservationRef = this.setReservationRef.bind(this)
    }
    render() {
        const {navigation} = this.props;
        
        const {item} = navigation.state.params.event;
        const location = item.locations[0].Label;
        const cost = 'Gratuit'
        const time = moment(item.timestamp).format('lll');
        const icon = "user";
        const visits = [
            {
                "name": "Kyoto International Manga Museum",
                "address": "京都国際マンガミュージアム",
                "location": {
                    "longitude": 35.011941,
                    "latitude": 135.759274
                }
            },
            {
                "name": "Kyoto Kaleidoscope Museum",
                "address": "京都万華鏡ミュージアム姉小路館",
                "location": {
                    "longitude": 35.009778,
                    "latitude": 135.761645
                }
            }
        ]
        return (
            <ScrollView>
                <Header title={item.Title} picture={{uri: item.image , preview : item.image}}>
                    <NavigationBar type="transparent" back="Events" {...{navigation}} />
                </Header>
                <DetailsBar details={[{ icon: "credit-card", caption: cost },{ icon: "map-pin", caption: location }, { icon: "clock", caption: time }]} />
                <Content style={styles.gutter}>
                    <Text style={{flex: 1 ,padding: 10}}>{item.summary}</Text>
                    <Button primary icon="calendar" label="  Reserver" onPress={this.toggleReservation} />
                    <Button  primary icon="credit-card" label="  Payment" onPress={this.toggleIngredientList} />
                </Content>
                <ActionSheet title="Reservation" ref={this.setReservationRef}>
                    {
                        visits.map((visit, index) => (
                            <ReservationSheat   style={styles.separator}   key={index} first={index === 0}  last={index === (visits.length - 1)}
                                {...{visit}}
                            />
                        ))
                    }
                    <View style={styles.gutter}>
                        <DatePicker /> <QuantityInput singular="person" plural="people" from={1} to={6} />   <PayButton />
                    </View>
                </ActionSheet>
            </ScrollView>
        );
    }
    toggleReservation() {
        this.reservationObj.toggle();
    }
    setReservationRef(reservationObj) {
        if (reservationObj) {
            this.reservationObj = reservationObj;
        }
    }
}
const styles = StyleSheet.create({
    gutter: {
       padding: 10,
    backgroundColor: 'white'
    }
});
