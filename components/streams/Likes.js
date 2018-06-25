import * as React from "react";
export default function Posts(WrappedComponent) {
    return class extends React.Component {
      constructor(props) {
        super(props);
        const {stream} = this.props
        console.log(stream)
        const id = stream ?  stream : this.props.navigation.state.params.stream;
        this.state = {   likes : []  }
        this.toggleLike = this.toggleLike.bind(this)
        this.list = global.dsc.record.getList('/likes/' + id.toString());
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
     toggleLike(action){
       if (action ===  true) this.list.addEntry(global.user.name)
       else this.list.removeEntry(global.user.name)
      }
      render() {
        const {likes} = this.state;
        const {toggleLike} = this;
        return <WrappedComponent {...{...this.props , toggleLike , likes}} />;
      }
    };
  }