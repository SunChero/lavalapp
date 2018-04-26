import * as React from "react";
export default function withVues(WrappedComponent) {
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          vues : 0
        }
      }
      componentDidMount(){
        const {stream} = this.props;
        this.stream = stream ? stream : this.props.navigation.state.params.stream;
        global.dsc.record.getRecord( id ).set( obj).discard();
        this.list.subscribe(this._setEntries.bind(this))
      }
      componentWillUnmount(){
        this.list.discard()
      }
      _setVues(counter){
        this.setState({
          "posts" : entries
        })
      }
     LikeIt(yes=true){
       this.list.addEntry( global.user.name)
      }
      render() {
        const {vues} = this.state;
        const {LikeIt} = this;
        return <WrappedComponent  {...{...this.props , LikeIt , likes}} />;
      }
    };
  }