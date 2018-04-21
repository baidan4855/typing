import React, { Component } from "react";
import { Observable } from "rxjs";

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }
  componentWillUnMount() {
    this.clear();
  }
  componentDidMount() {
    this.startPlay(this.props.records);
  }
  componentWillReceiveProps(nextProps) {
    this.clear();
    this.startPlay(nextProps.records);
  }
  clear() {
    this.sub && this.sub.unsubscribe();
    delete this.sub;
    this.timeoutId && clearTimeout(this.timeoutId);
    this.setState({ text: "" });
  }
  startPlay(records = []) {
    this.clear();
    const stream$ = Observable.create(observer => {
      const play = index => {
        if (index < records.length) {
          const record = records[index];
          this.timeoutId = setTimeout(() => {
            clearTimeout(this.timeoutId);
            observer.next(record);
            play(++index);
          }, record.interval);
        } else {
          observer.complete();
        }
      };
      play(0);
    });
    this.sub = stream$.subscribe(({ selection, to }) => {
      if (Object.prototype.toString.call(to) === "[object String]") {
        const text =
          this.state.text.substr(0, selection.start) +
          to +
          this.state.text.substr(selection.end);
        this.setState({ text });
      }
    });
  }
  render() {
    return <div style={this.props.style}>{this.state.text}</div>;
  }
}
