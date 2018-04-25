import * as React from "react";
import moment from 'moment'
import {NavigationActions }from 'react-navigation'
import {StyleSheet, View , Text , ScrollView , Modal} from "react-native";
import {inject} from 'mobx-react/native'
import { Shell, NewMessage,  withStreams, Header, NavigationBar, DetailsBar, Content,  Button, ActionSheet, StyleGuide , Container , Avatar , IconButton, withStyles} from "./index";

class SheetView extends React.Component {
    constructor(props){
        super(props)
        this.toggleAction = this.toggleAction.bind(this)
        this.setActionRef = this.setActionRef.bind(this)
    }
    render() {
      //  const {title, navigation, theme, back, rightAction, header, style , body} = this.props;
        const {Title , image , details ,  actions , description , navigation , stream , comp , theme} = this.props;
        const posts = this.props.stream;
        const title = Title
        const back = "Events"
        const header = 
            <View style={styles.container}>
                <Avatar uri={image} size={110} style={styles.avatar} />
                    <Text color="white" type="title3" style={styles.text}>{Title}</Text>
                    <View style={{flex : 1 , flexDirection : 'row' , alignContent: "space-between", justifyContent: "center" }}>
                        <IconButton  name="calendar" style={{flex : 1}} />
                        <IconButton name="calendar" style={{flex : 1}} />
                        <IconButton name="calendar" style={{flex : 1}} />
                 </View>
            </View>
        
        return (
           
                <Shell 
                    header={header}
                    body={(<Content style={styles.gutter}>
                                     <Text style={{flex: 1 ,padding: 10}}>{description}</Text>
                                     {actions && actions.map( action => <Button primary icon={action.icon} label={action.label} onPress={(comp) => this.toggleAction()} />)}
                                 </Content>)}
                    {...{title , image ,  actions , description , navigation  }}
                />
           
            // <ScrollView style={{flex : 1, backgroundColor: "#283355"}}>
                
            //         <View  height={200} style={{backgroundColor: "#283355"}}>
            //             <View style={styles.container}>
            //                 <Avatar uri={image} size={110} style={styles.avatar} />
            //                 <Text color="white" type="title3" style={styles.text}>{Title}</Text>
            //                 <View style={{flex : 1 , flexDirection : 'row' , alignContent: "space-between", justifyContent: "center" }}>
            //                     <IconButton  name="calendar" style={{flex : 1}} />
            //                     <IconButton name="calendar" style={{flex : 1}} />
            //                     <IconButton name="calendar" style={{flex : 1}} />
            //                 </View>
            //             </View>
            //         </View>
                   
            //         <Content style={styles.gutter}>
            //             <Text style={{flex: 1 ,padding: 10}}>{description}</Text>
            //             {actions && actions.map( action => <Button primary icon={action.icon} label={action.label} onPress={(comp) => this.toggleAction()} />)}
            //         </Content>
            //         <ActionSheet title="Action" ref={this.setActionRef}>
            //             {   comp()                    }
            //         </ActionSheet>
            // </ScrollView>
        );
    }
    toggleAction() {
        this.ActionRef.toggle();
    }
    setActionRef(ActionRef) {
        if (ActionRef) {
            this.ActionRef = ActionRef;
        }
    }
}
const styles = StyleSheet.create({
    gutter: {
       padding: 10,
    backgroundColor: 'white'
    },
        container: {
            marginHorizontal: StyleGuide.spacing.small,
            flex: 1,
            justifyContent: "center"
        },
        avatar: {
            borderRadius: 45,
            borderWidth: 3,
            borderColor: StyleGuide.palette.white,
            marginVertical: StyleGuide.spacing.tiny
        },
        text: {
            textAlign: "center",
            color : 'white',
            fontSize: 20,
            fontWeight: '900',
        },
        content: {
            paddingBottom: StyleGuide.spacing.small
        }

});


export default SheetView;