import React from 'react';
import Stone from './Stone';

export default class Square extends React.Component {
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
