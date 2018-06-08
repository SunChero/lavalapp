import * as React from "react";
import {observable, action} from "mobx";
import {observer} from "mobx-react/native";
import {StyleSheet, TextInput, View , Text , Modal , Image} from "react-native";
import SegmentedControl from './SegmentedControl'
import {StyleGuide} from './theme'
import KeyboardSpacer from './KeyboardSpacer';
import CameraRollPicker from 'react-native-camera-roll-picker';
import {NavigationBar} from "./index";
@observer
export default class NewMessage extends React.Component<{}> {

    @observable selectedIndex = 0;
    @observable images = [];
    @observable location = null;
    @observable showCamera = false;
    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.state = {
            location : {
                latitude : null,
                longitude : null
            },
        }
        this.selectImages = this.selectImages.bind(this)
    }
    @action
    onChange(index) {
        this.selectedIndex = index;
        const options = ['Choose From Library', 'Send Location', 'Cancel'];
        switch (index) {
              case 1:
               this.showCamera = true;
                break;
              case 2:
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                        this.location =  {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            }
                      },
                  (error) => alert(error.message),
                  {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
                );
                break;
              default:
        }
    }
    selectImages(images) {
        this.images = images
    }
    
    render() {
        const {selectedIndex, onChange} = this;
        const title = "Select Image"
        const rightAction = {icon : "md-checkmark-circle-outline" , type:"ionicons" ,  onPress : () => { this.showCamera = false;}
        }
        return (
            <View style={styles.container}>
                {this.location && <View style={{ height :20, color: 'black'}}> <Text>{this.location.latitude +' \ '+ this.location.longitude} </Text></View> }
                
                {
                     this.images.map((i)=><Image style={styles.image}  source={{ uri:i.uri }}  />) 
                }
                <Modal   animationType={'slide'}     transparent={false}  visible={this.showCamera}  onRequestClose={() => {
                        this.showCamera = false;
                        }}
                >
                    <NavigationBar {...{rightAction, title }}/>
                    <CameraRollPicker   maximum={10}  imagesPerRow={4}   callback={this.selectImages}   selected={this.images}   />
                </Modal>
                <TextInput  style={styles.textInput}  placeholder="Description"  underlineColorAndroid="transparent"  textAlignVertical="top" multiline  autoFocus
                    onChangeText={(text) => this.props.onChange(text)}
                />
                {
                    this.props.voila && (
                        <SegmentedControl transparent values={["Description", "Photo" , "Position"]} {...{selectedIndex, onChange}} />
                    )
                }
                
                <KeyboardSpacer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: StyleGuide.spacing.base
    },
    textInput: {
        height: 143,
        ...StyleGuide.typography.body
    }, 
    image: {
        width: 100,
        height: 100,
        borderRadius: 0,
        margin: 3,
        resizeMode: 'cover',
      }

});
