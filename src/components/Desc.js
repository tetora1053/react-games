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
        {(() => {
          if (this.props.gameResult.isEnd) {
            return (
              <div>
                <p>ゲーム終了</p>
                <p>{this.props.gameResult.winner}の{this.props.gameResult.diff}勝ちです</p>
              </div>
            )
          }
        })()}
      </div>
    );
  }
}
