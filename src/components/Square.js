import React from 'react';
import Stone from './Stone';

export default class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const class_name = (this.props.is_can_put) ? 'square-can_put' : 'square';
    return (
      <button
        className={class_name}
        onClick={this.props.handleSquareClick}
        value={this.props.square_number}>
        <Stone squareState={this.props.squareStates[this.props.square_number]}/>
      </button>
    );
  }
}
