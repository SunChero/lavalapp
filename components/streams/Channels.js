import * as React from "react";
export default function Channels(WrappedComponent) {
    return class extends React.PureComponent {
      constructor(props) {
        super(props);
        const ocRefStr = `${global.user.name}-open-channels`
        this.ocRef = global.dsc.record.getList(ocRefStr);
        this.ocRef.subscribe(this.setocEntries)
      }
      state = {
          oc : []
      }
      componentWillUnmount(){
        this.ocRef.discard()
      }
      setocEntries = entries => this.setState({ "oc" : entries })
      render() {
        const channels = this.state.oc;
        return <WrappedComponent {...{...this.props ,channels}} />;
      }
    };
  }