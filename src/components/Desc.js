import React from 'react';

export default class Desc extends React.Component {
  constructor(props) {
    super(props);
  }

  getTurnStr(turn: string) {
    if (turn == 'black') {
      return "黒";
    }
    return "白";
  }

  render() {
    return (
      <div>
        <p><span>{this.getTurnStr(this.props.turn)}</span>のターン</p>
        {(() => {
          if (this.props.gameResult.isEnd) {
            return (
              <div>
                <p>ゲーム終了</p>
                <p>{this.getTurnStr(this.props.gameResult.winner)}の{this.props.gameResult.diff}石勝ちです</p>
              </div>
            )
          }
        })()}
      </div>
    );
  }
}
