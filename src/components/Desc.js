import React from 'react';

export default class Desc extends React.Component {
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
