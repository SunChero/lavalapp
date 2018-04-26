
import * as React from "react";
export default function Posts(WrappedComponent) {
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {   posts : []  }
        this.AddPost = this.AddPost.bind(this)
        this.posts_id = this.props.navigation.state.params.posts_id;
        this.list = global.dsc.record.getList('/posts/' + this.posts_id);
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
       global.dsc.record.getRecord( id ).set(obj).discard();
       this.list.addEntry(id)
      }
      render() {
        const {posts} = this.state;
        const {AddPost} = this;
        return <WrappedComponent {...{...this.props , AddPost , posts}} />;
      }
    };
  }