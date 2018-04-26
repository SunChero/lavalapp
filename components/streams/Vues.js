import * as React from "react";
export default function withVues(WrappedComponent) {
    return class extends React.Component {
      constructor(props) {
        super(props);
        const {stream} = this.props;
        const id  = stream ? stream : this.props.navigation.state.params.stream;
        this.state = {
            counter: 0
        }
        self =this
        this.record = global.dsc.record.getRecord(id)
        this.record.whenReady( ( rc) =>{
          rc.set( "counter" , rc.get("counter") + 1 )
          self.setState({
            counter : rc.get("counter")
          })
        });
      }
      componentDidMount(){
        
        
       // this.record.subscribe(this._setRecord.bind(this))
      }
      componentWillUnmount(){
        this.record.discard()
      }
      // _setRecord(rc){
      //   console.log(rc)
      //   this.setState({
      //     "counter" : rc.counter
      //   })
      // }
     
      render() {
        const vues = this.state.counter;
        const {counter} = this;
        return <WrappedComponent  {...{...this.props , vues}} />;
      }
    };
  }