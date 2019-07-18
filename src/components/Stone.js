import React from 'react';

export default class Stone extends React.Component {
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