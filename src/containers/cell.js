import React, { Component } from "react";
import classNames from "classnames";

type Props = {
  row: number,
  column: number,
  value: string | number,
  cellsClicked: Function
};
type State = {
  clicked: boolean,
  flag: string
};
let endMineSweeperGame = false;

class Cell extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { clicked: false, flag: "" };
  }
  handleClick({ target }: SyntheticMouseEvent<>) {
    let { row, column, incCellsClicked, value } = this.props;
    let { clicked, flag } = this.state;
    if (!flag) this.setState({ clicked: true });
    if (!clicked) incCellsClicked();
    if (!endMineSweeperGame) {
      // Empty cell click --> recursion
      if (value === "" && target.id === `${row}_${column}`)
        recursionClick(target, row, column);
      //click bomb scenario --> end game
      if (value === "☀" && !flag) endGame(target);
    }
  }
  handleContextMenu(e: SyntheticMouseEvent<>) {
    e.preventDefault();
    let { clicked, flag } = this.state;
    if (!clicked)
      flag ? this.setState({ flag: "" }) : this.setState({ flag: "⚑" });
  }
  render() {
    let { row, column, value } = this.props;
    let { clicked, flag } = this.state;
    let cellsClass = classNames({
      cell: true,
      clicked,
      bomb: value === "☀"
    });
    return (
      <td
        id={`${row}_${column}`}
        className={cellsClass}
        onClick={this.handleClick.bind(this)}
        onContextMenu={this.handleContextMenu.bind(this)}
      >
        {clicked && !flag ? value : ""}
        {flag}
      </td>
    );
  }
}

export default Cell;

function recursionClick(target, row, column) {
  target.id = `${row}_${column}_`;
  let rowList = [row - 1, row, row + 1];
  let colList = [column - 1, column, column + 1];
  for (let i of rowList) {
    for (let j of colList) {
      setImmediate(() => {
        if (document.getElementById(`${i}_${j}`))
          document.getElementById(`${i}_${j}`).click();
      });
    }
  }
  return;
}

function endGame(target) {
  endMineSweeperGame = true;
  target.style.backgroundColor = "black";
  let cols = target.parentElement.children.length;
  let rows = target.parentElement.parentElement.children.length;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (document.getElementById(`${i}_${j}`))
        document.getElementById(`${i}_${j}`).click();
    }
  }
  return;
}
