import React from 'react';
import SquareRow from './SquareRow';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let squareRows = [];
    for (let i = 0; i < 8; i++) {
      squareRows.push(
        <SquareRow
          key={i}
          row_number={i}
          handleSquareClick={this.props.handleSquareClick}
          squareStates={this.props.squareStates}
        />
      );
    }
    return (
      <div id="board">
        {squareRows}
      </div>
    );
  }
}
