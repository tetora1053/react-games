import React from 'react';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      turn: 'black',
      squareStates: [],
    }
    this.handleSquareClick = this.handleSquareClick.bind(this);
  }

  handleSquareClick(e) {
    console.log(e.target.value);
    const next_turn = (this.state.turn === 'black') ? 'white': 'black';
    this.setState({turn: next_turn});
  }

  render() {
    return (
      <div>
        <Desc turn={this.state.turn}/>
        <Board
          turn={this.state.turn}
          handleSquareClick={this.handleSquareClick}
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
      squareRows.push(<SquareRow key={i} row_number={i} handleSquareClick={this.props.handleSquareClick}/>);
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
      squares.push(<Square key={i} square_number={square_number} handleSquareClick={this.props.handleSquareClick}/>);
    }
    return (
      <div>{squares}</div>
    );
  }
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClick: false,
    }
  }

  render() {
    return (
      <button
        className="square"
        onClick={this.props.handleSquareClick}
        value={this.props.square_number}
      >
        <Stone isClick={this.state.isClick}/>
      </button>
    );
  }
}

class Stone extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.isClick) {
      return null;
    }
    return (
        <div className="stone"></div>
    );
  }
}