import {observable, runInAction,  action , computed} from 'mobx';
import moment from 'moment';
import {SITE_URL , NEWS_PAGE_URL} from '../api/constants'

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
    @action loadSite = () =>{
        return fetch(SITE_URL).then(response => response.json())
               .then(data =>{
                  runInAction(()=>{
                      this.info = data;
                  })
              })
    }
    @computed get _fullEvents(){
        let objs = {}
        let filter = []
        let counter = 0
        this.info.events.map( item => {
            
           if(! objs[item.eventDate]){ 
             objs[item.eventDate] = []
           }
           let arr = objs[item.eventDate]
           let exist = false;
           
           arr.map( (ev ) =>{
               if(ev.Title === item.Title && ev._eventData === item._eventData){
                   console.log(`event Exist already skipping ` + counter++)
                   exist = true;
               }
           })
           exist ? null  : objs[item.eventDate].push(item);
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
            return moment(item.eventDate).isBetween(moment(), moment().add(1, 'week'))
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
