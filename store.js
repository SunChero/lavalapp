import {observable, runInAction,  action , computed} from 'mobx';
import moment from 'moment';

const GET_SITE_URL = 'http://192.168.183.121:3000/_web/export/api'
const NEWS_PAGE_URL = 'http://192.168.183.121:3000/_web/newsPage?link='
const GET_USER_URL = 'https://randomuser.me/api/?nat=CA'

class Store {
    @observable newsPage = {};
    @observable site = {};
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
        return fetch(GET_SITE_URL).then(response => response.json())
               .then(data =>{
                  runInAction(()=>{
                      this.site = data;
                  })
              })
    }
    @computed get _fullEvents(){
        let objs = {}
        this.site.events.map( item => {
           if(! objs[item.eventDate]){ 
             objs[item.eventDate] = []
           }
           objs[item.eventDate].push(item);
           return item;
        });
        return objs;
       
    }
    @computed  get _hotEvents(){
        let uniqueUrls = [];
      //  console.log(this.site.events)
        const hotEvents = this.site.events.filter((item) => {
            if (!uniqueUrls.includes(item.PageUrl)) {
                return uniqueUrls.push(item.PageUrl) && item.hot
            }
        })
        return hotEvents;
    }
    @computed get _weekEvents(){
        const tmp = this.site.events.filter((item) => {
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
export const store = new Store();