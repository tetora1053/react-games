import React from 'react';

export default class Game extends React.Component {
  render() {
    return (
      <Board />
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
  render() {
    return (
      <button></button>
    );
  }
}