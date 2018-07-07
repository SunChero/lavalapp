import {observable, runInAction,  action , computed} from 'mobx';
import moment from 'moment';
import {SITE_URL , NEWS_PAGE_URL , DOTS} from '../api/constants'
import {AsyncStorage} from 'react-native'


export const Dots =  {
    Sports : 'goldenrod',
    Dehors : 'fuchsia',
    "Centre de la nature" : 'green',
    "Expositions et spectacles" : 'lightblue',
    default : '#4A148C'
  };
export class SiteStore {
    @observable newsPage = {};
    @observable info = {};
    @action loadNewsPage = (link) =>{
        this.newsPage = {}
            fetch(NEWS_PAGE_URL + link).then(response => response.json())
              .then(data =>{
                  runInAction(() => {
                      this.newsPage = data;
                  })
            })
    }
    @action loadSite = async () =>{
        return fetch(SITE_URL).then(response => response.json())
               .then(data =>{
                  runInAction(()=>{
                     // data.events = data.events.reduce((x, y) => x.findIndex(e=>e.id==y.id)<0 ? [...x, y]: x, [])
                     // data.news = data.news.sort((a ,b) => a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0)
                      this.info = data;
                     // this.SyncPreferedEvents()
                  //    this.filterEvents()
                    return  this.saveSiteInfo()
                     
                })
        })
    }
  
    
   
    saveSiteInfo =  () => {
       return  AsyncStorage.setItem('@ICILAVAL:info' , JSON.stringify(this.info));
    }
    @action init = async () =>{
        //let offline  =  await AsyncStorage.getItem('@ICILAVAL:info')
        //this.info = offline ? JSON.parse( offline) : {}
        await this.loadSite()
    }
    filterEvents = () =>{
        console.log(this.info.events.length)
        let arr =[]
        let exist = false
        this.info.events.map((e , index) => {
            arr.map((item, i) => {
                if(item.Title === e.Title && item._eventDate === e._eventDate){
                    exist = true
                } 
            })
            exist ?   null : arr.push(e)
            exist = false;
        })
        this.info.events = arr;
    }
    @computed get _fullEvents(){
        let objs = {}
        this.info.events.map( item => {
           if(! objs[item.eventDate]){ 
             objs[item.eventDate] = []
           }
           let arr = objs[item.eventDate]
           objs[item.eventDate].push(item);
           return item;
        });
        return objs;
    }
    getDots = (event) =>{
        return event.categories.map(e =>{
            console.log(e.Label)
            let color =  `${Dots[e.Label]}`  === 'undefined'  ? Dots.default : `${Dots[e.Label]}` 
            return {
                key : e.Label,
                color : color
            }
        })
    }
    @computed get markedDates() {
        let objs = {}
        this.info.events.map( item => {
           if(! objs[item.eventDate]){ 
             objs[item.eventDate] = {dots :this.getDots(item)}
           }
           return item;
        });
        return objs;
    }
    @computed  get _hotEvents(){
        let uniqueUrls = [];
      //  console.log(this.site.events)
        const hotEvents = this.info.events.filter((item) => {
            if (!uniqueUrls.includes(item.PageUrl)) {
                return uniqueUrls.push(item.PageUrl) && item.hot
            }
        })
        return hotEvents;
    }
    @computed get _weekEvents(){
        const tmp = this.info.events.filter((item) => {
            return moment(item.eventDate).isBetween(moment(), moment().add(1, 'week')) && !item.hot
        })
        uniqueUrls = [];
        const weekEvents = tmp.filter((item) => {
            if (!uniqueUrls.includes(item.PageUrl)) {
              return uniqueUrls.push(item.PageUrl)
            }
        })
        return weekEvents;
    }
}
