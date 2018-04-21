import React, { Component } from "react";
import record from "./record";

export default class Recorder extends Component {
  constructor(props) {
    super(props);
    this.state = { records: [] };
  }
  componentDidMount() {
    const stream$ = record(this.refs.input);
    this.sub = stream$.subscribe(change =>
      this.setState({
        records: [...this.state.records, change]
      })
    );
  }
  componentWillUnMount() {
    this.sub && this.sub.unsubscribe();
    delete this.sub;
  }
  render() {
    return (
      <div style={this.props.style}>
        <textarea ref="input" style={{ width: "100%" }} />
        <code style={{ width: "100%" }}>
          {JSON.stringify(this.state.records)}
        </code>
      </div>
    );
  }
}
