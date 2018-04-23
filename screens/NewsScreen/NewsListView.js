import React from "react"
import { Text, FlatList, View, Image, ScrollView, Animated, TouchableOpacity } from 'react-native';
import {Ionicons as Icon} from '@expo/vector-icons'
import Alerts from './Alerts'
import { NewsCard , Feed , ActionSheet , notImplementedYet , NewMessage , IconButton , Ratings} from '../../components'
import {observer, inject} from 'mobx-react/native'
import moment from 'moment'


@inject('store' , 'theme') 
@observer
export default class NewsListView extends React.Component{
    constructor(props){
        super(props)
       
        this.onPress = this.onPress.bind(this)
        this.newPostRef = this.newPostRef.bind(this)
        this.renderItem = this.renderItem.bind(this)
    }
    onPress() {
        this.newPost.toggle();
    }
    newPostRef(newPost) {
        if (newPost) {
            this.newPost = newPost;
        }
    }
    componentDidMount(){
      // this.props.navigation.state.routeName == 'list' ?  this.props.NewsStore.loadNews() : null 
    }
    
    renderItem = (item) => {
        const news = item.item;
        const image = 'http://www.laval.ca' + news.ImageUrl
        const _onPress = () => {
            this.props.store.loadNewsPage(news.link);
            this.props.navigation.navigate('page' , {stream_id : news.id})}
        return (
            <TouchableOpacity style={{  flex: 1 , marginBottom: 50}} underlayColor="rgba(253,138,94,0.2)" onPress={_onPress}>
                <View>
                    <View>
                        <Image  source={{ uri: image   }}
                        style={{  height: 230, width: null,  flex: 1  }}/>
                    </View>
                    <View style={{  padding: 10 }}>
                        <Text style={{ color: "#283355" ,fontFamily: "SFProText-Semibold" , fontSize: 25  }}>{news.caption} </Text>
                    </View>
                   
                    
                    <View style={{ padding: 10  }}>
                        <Text>{moment(news.timestamp).fromNow()}</Text>
                    </View>
                    <View style={{ padding: 10  }}>
                        <Text style={{ fontFamily: "SFProText-Regular" , fontSize: 18 , fontWeight: "100" }}>  {news.body} </Text>
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
        const rightAction = {          icon: "zap",            onPress        };
        const postAction = {            label: "Send",            onPress: notImplementedYet        };
        return (
        <View style={{flex : 1}}>
            <Feed 
             header={<Alerts {...{alerts : Alertes}} />}
            {...{data : news, renderItem, title, navigation,rightAction }} />
            <ActionSheet title="Aviser la ville" ref={this.newPostRef} rightAction={postAction}>
                    <NewMessage />
            </ActionSheet>
        </View>
        )
    }
}

