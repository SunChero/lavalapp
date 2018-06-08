import React from "react"
import { Text, FlatList, View, ScrollView, Animated, TouchableOpacity } from 'react-native';
import {Ionicons as Icon} from '@expo/vector-icons'
import Alerts from './Alerts'
import { Image ,NewsCard , Feed , ActionSheet , notImplementedYet , NewMessage , IconButton , withTheme} from '../../components'
import {observer, inject} from 'mobx-react/native'
import moment from 'moment'
@inject('store') 
@observer
class NewsList extends React.Component{
    constructor(props){
        super(props)
        this.onPress = this.onPress.bind(this)
        this.newPostRef = this.newPostRef.bind(this)
        this.renderItem = this.renderItem.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }
    onPress() {
        this.newPost.toggle();
    }
    newPostRef(newPost) {
        if (newPost) {
            this.newPost = newPost;
        }
    }
    onChangeHandler = (data) => {
        this.newMessage = data
    }
    renderItem = (item) => {
        const {theme} = this.props;
        const news = item.item;
        const image = 'http://www.laval.ca/' + news.ImageUrl
        //const image = news.ImageUrl.startsWith('http') ? news.ImageUrl :  'http://www.laval.ca' + news.ImageUrl
        console.log(image)
        const _onPress = () => {
            this.props.store.loadNewsPage(news.link);
            this.props.navigation.navigate('page' , {stream : news.id})}
        return (
            <TouchableOpacity style={{  flex: 1 , paddingBottom: 50 }}  onPress={_onPress}>
                <View>
                    <View style={{  padding: 10 }}>
                        <Text style={{ color: theme.palette.secondary ,fontFamily: "SFProText-Semibold" , fontSize: 35  }}>{news.caption} </Text>
                    </View>
                    <View style={{ padding: 10  }}>
                        <Text>{moment(news.timestamp).fromNow()}</Text>
                    </View>
                    <View style={{ padding: 10  }}>
                        <Text style={{ fontFamily: "SFProText-Semibold" , fontSize: 16 , fontWeight: "400" }}>  {news.body} </Text>
                    </View>
                    <View>
                        <Image uri={image}  preview={image} style={{  height: 250, width: null,  flex: 1  }}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render(){
        const {onPress, renderItem} = this;
        const {news , Alertes} = this.props.store.site; 
        const title = "News"
        const {navigation} = this.props;
        const rightAction = {          icon: "md-paper-plane", type: "ionicons"  ,         onPress        };
        const postAction = {            label: "Send",            onPress: notImplementedYet        };
        return (
        <View style={{flex : 1 ,backgroundColor:"white"}}>
            <Feed 
                header={<Alerts {...{alerts : Alertes}} />}
                    {...{data : news, renderItem, title, navigation,rightAction }} />
                    <ActionSheet title="Aviser la ville" ref={this.newPostRef} rightAction={postAction}>
                        <NewMessage onChange={this.onChangeHandler} voila/>
                    </ActionSheet>
        </View>
        )
    }
}

export default withTheme(NewsList)