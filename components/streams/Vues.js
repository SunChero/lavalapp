import * as React from "react";
export default function withVues(WrappedComponent) {
    return class extends React.Component {
      state = {
        counter : 0
      }

      componentDidMount() {
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
      componentWillUnmount(){
        this.record.discard()
      }
      render() {
        const vues = this.state.counter;
        const {counter} = this;
        return <WrappedComponent  {...{...this.props , vues}} />;
      }
    };
  }