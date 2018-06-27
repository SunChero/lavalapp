import * as React from "react";
import {hasLikes, hasVues} from '../index'
@hasLikes
@hasVues
export default function Comments(WrappedComponent) {
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {   comments : []  }
        const {stream} = this.props;
        const id = stream ? stream : this.props.navigation.state.params.stream;
        this.list = global.dsc.record.getList('/comments/' + id.toString());
        this.list.subscribe(this.setEntries)
      }
      componentWillUnmount(){
        this.list.discard()
      }
      setEntries = (entries) =>{
        this.setState({
          "comments" : entries
        })
      }
      AddComment = (obj) => {
       var id = '/comment/' + global.dsc.getUid();
       global.dsc.record.getRecord( id ).set(obj).discard();
       this.list.addEntry(id)
      }
      render() {
        const {comments} = this.state;
        const {AddComment} = this;
        return <WrappedComponent {...{...this.props , AddComment , comments}} />;
      }
    };
  }