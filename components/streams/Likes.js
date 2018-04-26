import * as React from "react";
export default function Posts(WrappedComponent) {
    return class extends React.Component {
      constructor(props) {
        super(props);
        const {stream} = this.props
        console.log(stream)
        const id = stream ?  stream : this.props.navigation.state.params.stream;
        this.state = {   likes : []  }
        this.AddLike = this.AddLike.bind(this)
        this.list = global.dsc.record.getList('/likes/' + id);
        this.list.subscribe(this._setEntries.bind(this))
      }
      componentWillUnmount(){
        this.list.discard()
      }
      _setEntries(entries){
        this.setState({
          "likes" : entries
        })
      }
      AddLike(){
       const user = global.user.name
       this.list.addEntry(user)
      }
      render() {
        const {likes} = this.state;
        const {AddLike} = this;
        return <WrappedComponent {...{...this.props , AddLike , likes}} />;
      }
    };
  }