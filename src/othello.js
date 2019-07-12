import React from 'react';

export default class Game extends React.Component {
  render() {
    return (
      <div>
        <Desc />
        <Board />
      </div>
    );
  }
}

class Desc extends React.Component {
  constructor() {
    super();
    this.state = {
      turn: "black",
    }
  }

  render() {
    const turn = (this.state.turn) ? '黒' : '白';
    return (
      <div>
        <span>{turn}</span>のターン
      </div>
    );
  }
}

class Board extends React.Component {
  render() {
    let squareRows = [];
    for (let i = 0; i < 8; i++) {
      squareRows.push(<SquareRow key={i} />);
    }
    return (
      <div>
        {squareRows}
      </div>
    );
  }
}

class SquareRow extends React.Component {
  render() {
    let squares = [];
    for (let i = 0; i < 8; i++) {
      squares.push(<Square key={i} />);
    }
    return (
      <div>{squares}</div>
    );
  }
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.hundleClick = this.hundleClick.bind(this);
    this.state = {
      isClick: false,
    }
  }

  hundleClick() {
    console.log("hundleClick");
    this.setState({isClick: true});
  }

  render() {
    return (
      <button className="square" onClick={this.hundleClick}>
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