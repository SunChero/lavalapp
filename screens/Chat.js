
import moment from "moment";
import * as React from "react";
import {StyleSheet, SafeAreaView, TextInput, View  , FlatList} from "react-native";
import {observable, computed} from "mobx";
import {observer , inject} from "mobx-react/native";
import {Container, IconButton, KeyboardSpacer, StyleGuide , ChatMessage, NavigationBar} from "../components";
@inject('store')
@observer
export default class Message extends React.Component{
    @observable message;
    @observable counter = 1;
    @observable refreshing = false;
    postMessage = ()=> {
      const {user} = this.props.navigation.state.params;
     // console.log(`from ${global.user.name} to ${user}`)
      let msg = {
        'message' : this.message,
        'timestamp' : parseInt(moment().format("X"), 10),
        'from' : global.user.name,
        'to' : user
      }
      this.props.store.chat.sendMessage(msg)
      this.props.store.chat.addMessage(user , msg)
      this.message = "";
    }
    renderItem = (data) =>{
        const message = data.item;
        return <ChatMessage {...{message}} />;
    }
    scroll = (width , height) =>{
        if(! this.refreshing){
            setTimeout(function(){
                //this.refs.scrollview.scrollToOffset({offset : height -200  , animated: true})
                this.refs.scrollview.scrollToEnd({ animated: true})
            }.bind(this) , 100)
        }
        
    }
    setMessage = message => {
      this.message = message;
  }
  onRefresh = ()=>{
    this.refreshing = true
    this.counter++
    setTimeout(function(){
        this.refreshing = false
    }.bind(this) , 5000)
  }
  keyExtractor = (item , index ) =>  index
  render() {
    const {renderItem} = this;
    const {navigation } = this.props;
    const {user} = navigation.state.params;
    const back = "Messages";
    const title = user;
    return (
           <Container>
               <NavigationBar  {...{ navigation, title, back}} />
                <FlatList 
                 style={{backgroundColor: 'white'}}
                onContentSizeChange={this.scroll}
                 onRefresh={this.onRefresh} 
                 refreshing={this.refreshing} 
                 keyExtractor={this.keyExtractor}
                 scrollEventThrottle={16} 
                 ref="scrollview" 
                 data={this.props.store.chat.getMessages(user , this.counter * 20)}
                 {...{renderItem}} 
                />
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
