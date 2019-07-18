import React from 'react';

export default class SkipTurn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button onClick={this.props.skipTurn}>パス</button>
      </div>
    );
  }
}