
import * as React from "react";
import {hasLikes, hasVues} from '../index'
@hasLikes
@hasVues
export default function Posts(WrappedComponent) {
    return class extends React.Component {
      constructor(props) {
        super(props);
      
        this.state = {   posts : []  }
        const {stream} = this.props;
        const id = stream ? stream : this.props.navigation.state.params.stream;
        this.AddPost = this.AddPost.bind(this)
        this.list = global.dsc.record.getList('/posts/' + id);
        this.list.subscribe(this._setEntries.bind(this))
      }
      componentWillUnmount(){
        this.list.discard()
      }
      _setEntries(entries){
        this.setState({
          "posts" : entries
        })
      }
      AddPost(obj){
       var id = '/post/' + global.dsc.getUid();
       let o = {...{key : id} , ...obj}
       global.dsc.record.getRecord( id ).set(o).discard();
       this.list.addEntry(id)
      }
      render() {
        const {posts} = this.state;
        const {AddPost} = this;
        console.log(`returning posts ${JSON.stringify(posts)}`)
        return <WrappedComponent {...{...this.props , AddPost , posts}} />;
      }
    };
  }