import React from 'react';

export default class Game extends React.Component {
  constructor() {
    super();
    let squareStates = [];
    for (let i = 0; i < 64; i++) {
      switch (true) {
        case i === 27 || i === 36:
          squareStates[i] = 'white';
          break;
        case i === 28 || i === 35:
          squareStates[i] = 'black';
          break;
        default:
          squareStates[i] = '';
      }
    }
    this.state = {
      turn: 'black',
      squareStates: squareStates,
    }
    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.reverseStone = this.reverseStone.bind(this);
  }

  handleSquareClick(e) {
    const square_number = e.target.value;
    let square_states = this.state.squareStates;
    if (square_states[square_number] !== '') {
      console.log("you cant put stone here.");
      return;
    }
    const current_turn = this.state.turn;

    let res = false;
    const direction_arr = ["left", "right", "up", "down", "up-left", "up-right", "down-left", "down-right"];
    for (let i = 0; i < direction_arr.length; i++) {
      if (this.reverseStone(Number(square_number), current_turn, direction_arr[i], true)) {
        res = true;
      }
    }
    if (!res) {
      console.log("you cant put stone here.");
      return;
    }

    const next_turn = (current_turn === 'black') ? 'white': 'black';
    square_states[square_number] = current_turn;
    this.setState({
      turn: next_turn,
      squareStates: square_states,
    });
  }

  reverseStone(square_number, current_turn, direction, is_base = true, limit_square_number = null) {
    if (!is_base) {
      switch (true) {
        case direction === 'left' && square_number < limit_square_number:
        case direction === 'right' && square_number > limit_square_number:
        case direction === 'up' && square_number < limit_square_number:
        case direction === 'down' && square_number > limit_square_number:
        case direction === 'up-left' && square_number < limit_square_number:
        case direction === 'up-right' && square_number < limit_square_number:
        case direction === 'down-left' && square_number > limit_square_number:
        case direction === 'down-right' && square_number > limit_square_number:
          return false;
      }
    }
    if (is_base) {
      limit_square_number = this.getLimitSquareNumber(direction, square_number);
    }
    let next_square_number;
    switch (direction) {
      case 'left':
        next_square_number = square_number - 1;
        break;
      case 'right':
        next_square_number = square_number + 1;
        break;
      case 'up':
        next_square_number = square_number - 8;
        break;
      case 'down':
        next_square_number = square_number + 8;
        break;
      case 'up-left':
        next_square_number = square_number - 9;
        break;
      case 'up-right':
        next_square_number = square_number - 7;
        break;
      case 'down-left':
        next_square_number = square_number + 7;
        break;
      case 'down-right':
        next_square_number = square_number + 9;
        break;
    }
    const next_square_state = this.state.squareStates[next_square_number];
    if (next_square_state == undefined || next_square_state == '') {
      return false;
    }
    if ((is_base && next_square_state !== current_turn) || (!is_base && next_square_state !== current_turn)) {
      if (this.reverseStone(Number(next_square_number), current_turn, direction, false, limit_square_number)) {
        let square_states = this.state.squareStates;
        square_states[next_square_number] = current_turn;
        this.setState({squareStates: square_states});
        return true;
      }
    } else if (!is_base && next_square_state === current_turn) {
      return true;
    }
    return false;
  }

  getLimitSquareNumber(direction, square_number) {
      let limit_square_number;
      let tmp_square_number;
      let number_in_row;

      switch (direction) {
        case 'left':
          limit_square_number = square_number - (square_number % 8);
          break;

        case 'right':
          limit_square_number = square_number + (8 - (square_number % 8)) - 1;
          break;

        case 'up':
          limit_square_number = square_number % 8;
          break;

        case 'down':
          limit_square_number = 64 - (8 - (square_number % 8));
          break;

        case 'up-left':
          tmp_square_number = square_number;
          number_in_row = tmp_square_number % 8;
          while (true) {
            if ((tmp_square_number - 9 >= 0) && (number_in_row > (tmp_square_number - 9) % 8)) {
              tmp_square_number -= 9;
              number_in_row = tmp_square_number % 8;
              continue;
            }
            break;
          }
          limit_square_number = tmp_square_number;
          break;

        case 'up-right':
          tmp_square_number = square_number;
          number_in_row = tmp_square_number % 8;
          while (true) {
            if ((tmp_square_number - 7 >= 0) && (number_in_row < (tmp_square_number - 7) % 8)) {
              tmp_square_number -= 7;
              number_in_row = tmp_square_number % 8;
              continue;
            }
            break;
          }
          limit_square_number = tmp_square_number;
          break;

        case 'down-left':
          tmp_square_number = square_number;
          number_in_row = tmp_square_number % 8;
          while (true) {
            if ((tmp_square_number + 7 <= 63) && (number_in_row > (tmp_square_number + 7) % 8)) {
              tmp_square_number += 7;
              number_in_row = tmp_square_number % 8;
              continue;
            }
            break;
          }
          limit_square_number = tmp_square_number;
          break;

        case 'down-right':
          tmp_square_number = square_number;
          number_in_row = tmp_square_number % 8;
          while (true) {
            if ((tmp_square_number + 9 <= 63) && (number_in_row < (tmp_square_number + 9) % 8)) {
              tmp_square_number += 9;
              number_in_row = tmp_square_number % 8;
              continue;
            }
            break;
          }
          limit_square_number = tmp_square_number;
          break;
      }
      return limit_square_number;
  }

  render() {
    return (
      <div>
        <Desc turn={this.state.turn}/>
        <Board
          turn={this.state.turn}
          handleSquareClick={this.handleSquareClick}
          squareStates={this.state.squareStates}
        />
      </div>
    );
  }
}

class Desc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const turn_str = (this.props.turn === 'black') ? '黒' : '白';
    return (
      <div>
        <p><span>{turn_str}</span>のターン</p>
      </div>
    );
  }
}

class Board extends React.Component {
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

class SquareRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let squares = [];
    for (let i = 0; i < 8; i++) {
      let square_number = this.props.row_number * 8 + i;
      squares.push(
        <Square
          key={i}
          square_number={square_number}
          handleSquareClick={this.props.handleSquareClick}
          squareStates={this.props.squareStates}
        />
      );
    }
    return (
      <div>{squares}</div>
    );
  }
}

class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className="square"
        onClick={this.props.handleSquareClick}
        value={this.props.square_number}>
        <Stone squareState={this.props.squareStates[this.props.square_number]}/>
      </button>
    );
  }
}

class Stone extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const square_state = this.props.squareState;
    if (square_state === '') {
      return null;
    }
    const class_name = (square_state === 'black') ? 'black-stone' : 'white-stone';
    return (
        <div className={class_name}></div>
    );
  }
}
