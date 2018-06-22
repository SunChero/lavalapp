
import moment from "moment";
import * as React from "react";
import {StyleSheet, SafeAreaView, TextInput, View  , FlatList} from "react-native";
import {observable, action} from "mobx";
import {observer , inject} from "mobx-react/native";
import {Container, IconButton, KeyboardSpacer, StyleGuide , ChatMessage, NavigationBar} from "../components";
@inject('store')
@observer
export default class Message extends React.Component{
    @observable message;
    @observable messagesRef = [];
    postMessage = ()=> {
      const {user} = this.props.navigation.state.params;
      let msg = {
        'message' : this.message,
        'timestamp' : parseInt(moment().format("X"), 10),
        'user' : global.user.name
      }
      console.log(`emiting on ${user}-new-message`)
      global.dsc.event.emit(`${user}-new-message`, msg)
      this.props.store.chat.addMessage(msg)
      this.message = "";
    }
    renderItem = (data) =>{
        const {navigation} = this.props;
        const {scroll} = this;
        const message = data.item;
        return <ChatMessage {...{message , navigation , scroll}} />;
    }
    scroll = () =>{
        this.refs.scrollview.scrollToEnd({animated: true})
    }
    setMessage = message => {
      this.message = message;
  }
  render() {
    const {renderItem, messagesRef} = this;
    const {navigation } = this.props;
    const {user} = navigation.state.params;
    const back = "Messages";
    const title = user;
    return (
           <Container>
               <NavigationBar  {...{ navigation, title, back}} />
                <FlatList ref="scrollview" data={this.props.store.chat.messages.get(user)} {...{renderItem}} />
                <SafeAreaView style={styles.inputBox}>
                    <View style={styles.innerInputBox}>
                        <TextInput
                            placeholder="Message"
                            underlineColorAndroid="transparent"
                            style={styles.input}
                            onSubmitEditing={this.postMessage}
                            onChangeText={this.setMessage}
                            value={this.message}
                        />
                        <IconButton name="ios-send" type="ionicons" onPress={this.postMessage} color="black" size={40} rounded />
                    </View>
                </SafeAreaView>
                <KeyboardSpacer />
            </Container>
    )
  }
}

const styles = StyleSheet.create({
  inputBox: {
      backgroundColor: StyleGuide.palette.white
  },
  innerInputBox: {
      padding: StyleGuide.spacing.tiny,
      flexDirection: "row",
      alignItems: "center"
  },
  input: {
      backgroundColor: StyleGuide.palette.lightGray,
      flex: 1,
      padding: StyleGuide.spacing.tiny,
      marginRight: StyleGuide.spacing.tiny,
      ...StyleGuide.styles.borderRadius
  }
});
