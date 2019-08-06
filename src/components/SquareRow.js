import React from 'react';
import Square from './Square';

export default class SquareRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let squares = [];
    for (let i = 0; i < 8; i++) {
      let square_number = this.props.row_number * 8 + i;
      const is_can_put = this.props.canPutSquareNums.indexOf(square_number) >= 0;
      squares.push(
        <Square
          key={i}
          square_number={square_number}
          handleSquareClick={this.props.handleSquareClick}
          squareStates={this.props.squareStates}
          is_can_put={is_can_put}
        />
      );
    }
    return (
      <div>{squares}</div>
    );
  }
}
