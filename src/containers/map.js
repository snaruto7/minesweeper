// @flow

import React, { Component } from "react";
import Cell from "./cell";
import {
  nestedArray,
  populateNestedArray,
  valsAdjacentCounts
} from "../helpers";

type Props = {};
type State = {
  mapSize: number,
  bombCount: number,
  theMap: Array<Array<number | string>>,
  cellsClicked: number
};

class Map extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let mapSize = 10;
    let bombCount = 10;
    this.state = {
      mapSize,
      bombCount,
      theMap: valsAdjacentCounts(
        populateNestedArray(nestedArray(mapSize, mapSize), "☀", bombCount),
        "☀"
      ),
      cellsClicked: 1
    };
  }

  incCellsClicked() {
    let { mapSize, bombCount, cellsClicked } = this.state;
    let safeCells = mapSize * mapSize - bombCount;
    this.setState({
      cellsClicked: cellsClicked + 1
    });
    if (cellsClicked >= safeCells) alert("☀☀☀ You have won! ☀☀☀");
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.state.theMap.map((item, row) => {
              return (
                <tr key={row} className="mapRow">
                  {item.map((subitem, col) => {
                    return (
                      <Cell
                        key={col}
                        row={row}
                        column={col}
                        value={subitem}
                        incCellsClicked={this.incCellsClicked.bind(this)}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Map;
