
import * as React from "react";

export default function withStreams(WrappedComponent) {

    return class extends React.Component {
    
      constructor(props) {
        super(props);
        this.AddPost = this.AddPost.bind(this)
        this.state = {
          posts : []
        }
      }
      componentDidMount(){
        console.log('reinitializing List!')
        this.list = null;
        this.state = {
          posts : []
        }
        this.recordName = this.props.navigation.state.params.stream_id;
        this.list = global.dsc.record.getList('/posts/' + this.recordName);
        this.list.subscribe(this._setEntries.bind(this))
       
      }
      componentWillUnmount(){
        this.list.discard()
      }
      _setEntries(entries){
       // console.log(entries)
        this.setState({
          "posts" : entries
        })
      }
      AddPost(obj){
       var id = '/post/' + global.dsc.getUid();
       global.dsc.record.getRecord( id ).set( obj).discard();
       this.list.addEntry(id)
      }
    
      render() {
        const {posts} = this.state;
        const {AddPost} = this;
        return <WrappedComponent stream={posts} {...{...this.props , AddPost }} />;
      }
    };
  }