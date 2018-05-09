import {observable, runInAction,  action , computed} from 'mobx';
import moment from 'moment';

const GET_SITE_URL = 'http://192.168.2.22:3000/_web/export'
const NEWS_PAGE_URL = 'http://192.168.2.22:3000/_web/newsPage?link='
const GET_USER_URL = 'https://randomuser.me/api/?nat=CA'

class Store {
    
    @observable newsPage = {};
    @observable site = {};
  
    @observable users =[
        {
            "name" : "/user/1",
            "_id": "derek.russel",
            "_name": "Derek Russel",
            "picture": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/8bbac5ad06b4a569b8a446825f7371c81ebac821.png?alt=media&token=73b33332-c587-464b-af68-52554221b73a",
            "caption": ""
        },
        {
            "name" : "/user/2",
            "_id": "jmitch",
            "_name": "Joe Mitchell",
            "picture": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/9b5cb1a55d786aebebfe7379dc16b8ccf0e81942.png?alt=media&token=6f3c5b07-1b67-478b-9b46-15cfee8d6f54",
            "caption": ""
        },
        {
            "name" : "/user/3",
            "_id": "monicaa",
            "_name": "Monica Dixon",
            "picture": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/a71de5589d604ece4a685c2c270267cebe192be8.png?alt=media&token=0d91856a-8a43-4b58-8e44-57becc3f34eb",
            "caption": ""
        },
        {
            "name" : "/user/4",
            "_id": "andrea.schm_idt",
            "_name": "Andrea Schm_idt",
            "picture": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/6e37e1c924aa55072f25e47ede573285a6fb69bf.png?alt=media&token=ae4e9186-91b8-4748-963a-02138a3e395c",
            "caption": ""
        },
        {
            "name" : "/user/5",
            "_id": "alexandergarcia",
            "_name": "Alex Garcia",
            "picture": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/a2c02707b8423da62b591e7111e790a77917cf14.png?alt=media&token=98e89375-36ce-4477-b19a-7d68194de3e8",
            "caption": ""
        },
        {
            "name" : "/user/6",
            "_id": "mjcole",
            "_name": "Michael Cole",
            "picture": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/40eabfbf1c4cd057304d9a18e260d42c7025b5ca.png?alt=media&token=ebbc0a41-61db-4bed-a0c5-8f088eb16c21",
            "caption": ""
        },
        {
            "name" : "/user/7",
            "_id": "schavez",
            "_name": "Sylvia Chavez",
            "picture": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/6e37e1c924aa55072f25e47ede573285a6fb69bf.png?alt=media&token=ae4e9186-91b8-4748-963a-02138a3e395c",
            "caption": "Aspiring creative writer. I love 🌶 food and good people.",
            "cover": {
                "uri":  "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/e88d0539c04f38d3b7f7d030779f11feb26c3660.png?alt=media&token=7d2041fa-ed1f-41ee-ad6a-8af1531d657b",
                "preview": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAg_idx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAg_idwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMw_idZAAAA8ElEQVQYGRWPS1LCQABEX2YmwyR8EmRheRHv4Vm8rUstsQoKMAbI/Mew7a5+3V29vr+VKxa5KmSRmI6J4gSls6QQSHvB/X5H9M8Na9MQfuB8vlG2Gd0I5K+EKpONx/95VJSebqtnsWC/J1x50CFOkTBm4tpDn1Ff+4FWStKiUK0q4ikwVhEnA3FISJ9JtUe8mJ48FcIlUhfY7TYsQv2oousNEoWUGuWspVE1q7wgztRjHphyoNdLyrzoGiY27RJxGE/E+Z3QEpcd++FI6yW6NVxxSAvqpmZ/junaYHXg4/RJf1Y8dVucCUyHEWMNfj72D6rqgcOmcLiwAAAAAElFTkSuQmCC"
            }
        },
        {
            "name" : "/user/8",
            "_id": "griffinsof",
            "_name": "Sofia Griffin",
            "picture": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/8d8edc4c628969721a3127824566bcf7bef353c9.png?alt=media&token=99e98755-78ec-439b-ac51-778cba2d2cda",
            "caption": ""
        },
        {
            "name" : "/user/9",
            "_id": "itsmesuri",
            "_name": "Suri H.",
            "picture": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/881c9bfb4e5d3578355f328be01fe1d5152bbb27.png?alt=media&token=5ebcebcd-0c90-4d9d-8c45-daa05e6f1f41",
            "caption": ""
        },
        {
            "name" : "/user/10",
            "_id": "itsmesuri",
            "_name": "Suri H.",
            "picture": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/881c9bfb4e5d3578355f328be01fe1d5152bbb27.png?alt=media&token=5ebcebcd-0c90-4d9d-8c45-daa05e6f1f41",
            "caption": ""
        }
    ];
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
        console.log(this.site.events)
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