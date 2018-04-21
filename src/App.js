import React, { Component } from "react";
import Recorder from "./Recorder";
import Player from "./Player";
import data from "./data";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: data[0].records
    };
  }
  render() {
    return (
      <div className="App">
        <Recorder style={{ maxHeight: "100px", overflowY: "scroll" }} />
        <div style={{ display: "flex" }}>
          <ul style={{ flex: "0 0 120px" }}>
            {data.map(d => (
              <li
                key={d.date}
                onClick={() => {
                  console.log(d.date);
                  this.setState({ records: d.records });
                }}
              >
                {d.date}
              </li>
            ))}
          </ul>
          <Player style={{ flex: "1 1 auto" }} records={this.state.records} />
        </div>
      </div>
    );
  }
}

export default App;
