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
  }

  handleSquareClick(e) {
    console.log(e.target.value);
    const current_turn = this.state.turn;
    const next_turn = (current_turn === 'black') ? 'white': 'black';
    let squareStates = this.state.squareStates;
    squareStates[e.target.value] = current_turn;
    this.setState({
      turn: next_turn,
      squareStates: squareStates,
    });
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
      <div>
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