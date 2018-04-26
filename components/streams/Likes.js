
import * as React from "react";
export default function withLikes(WrappedComponent) {
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.LikeIt = this.LikeIt.bind(this)
        this.state = {
          likes : []
        }
      }
      componentDidMount(){
        const {stream} = this.props;
        this.stream = stream ? stream : this.props.navigation.state.params.stream;
        this.list = global.dsc.record.getList('/likes/' + this.stream);
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
     LikeIt(yes=true){
       this.list.addEntry( global.user.name)
      }
      render() {
        const {likes} = this.state;
        const {LikeIt} = this;
        return <WrappedComponent  {...{...this.props , LikeIt , likes}} />;
      }
    };
  }