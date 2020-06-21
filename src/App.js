import React, { Component } from "react";
import Map from "./containers/map";
import "./App.css";

class App extends Component {
  render() {
    const widthStyle = {
      width: "1500px"
    };
    return (
      <div style={widthStyle} >
        <div className="App">
          <br />
          <Map className="map" />
        </div>
        <p>How to play minesweeper: (Play on Chrome)</p>
        <p>1) The goal of the game is to NOT click any bombs</p>
        <p>
          2) Each number tells you how many bombs are adjacent to the "clicked"
          cell.
        </p>
        <p>
          3) The numbers range from 0 to 8. Each cell has 8 neighbors. Count
          them.
        </p>
        <p>4) Use process of elimination to choose where to click next.</p>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default App;
