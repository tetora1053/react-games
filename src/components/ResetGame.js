import React from 'react';

export default class ResetGame extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button onClick={this.props.resetGame}>リセット</button>
      </div>
    );
  }
}
