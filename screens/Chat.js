
import moment from "moment";
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, SafeAreaView, TextInput, View  , FlatList} from "react-native";
import {observable, action} from "mobx";
import {observer , inject} from "mobx-react/native";
import {Feed, Container, IconButton, KeyboardSpacer, StyleGuide , ChatMessage, NavigationBar} from "../components";


@inject('store')
@observer
export default class Message extends React.Component{

    @observable message;
    @observable messagesRef = [];
    constructor(props){
      super(props)
      const {user} = this.props.navigation.state.params;
   
      this.postMessage = this.postMessage.bind(this)
      const channel = '/channel/' + [user, global.user.name].sort().join('::');
   
      this.list = global.dsc.record.getList(channel);
      this.scroll = this.scroll.bind(this)
    }
    postMessage() {
      const {user} = this.props.navigation.state.params;
      const msgId = '/msg/' + global.dsc.getUid();
      let self= this;
       const msg = global.dsc.record.getRecord(msgId).set({
        'message' : self.message,
        'timestamp' : parseInt(moment().format("X"), 10),
        'user' : global.user.name
      }).discard();
      this.list.addEntry(msgId);
      this.message = "";
      console.log(`emtting on ${user}-new-message`)
      global.dsc.event.emit(`${user}-new-message`, global.user.name)
      
    }
    componentDidMount() {
       this.list.subscribe(this.setEntries.bind(this))
    }
    setEntries(entries){
      this.messagesRef = entries;
    }
    scroll(){
        this.refs.scrollview.scrollToEnd()
    }
    componentWillUnmount(){
      this.list.discard()
    }
    @autobind
    renderItem(data){
        const {navigation} = this.props;
        const {scroll} = this;
        const messageRef = data.item;
        return <ChatMessage {...{messageRef , navigation , scroll}} />;
    }
    @autobind @action
    setMessage(message) {
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
                <FlatList ref="scrollview" data={messagesRef} {...{renderItem}} />
               
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
