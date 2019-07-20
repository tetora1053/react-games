import React from 'react';
import Desc from './Desc';
import ResetGame from './ResetGame';
import SkipTurn from './SkipTurn';
import Board from './Board';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      turn: 'black',
    }
    this.skipTurn = this.skipTurn.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.getGameResult = this.getGameResult.bind(this);
    this.noticeFromBoard = this.noticeFromBoard.bind(this);
  }

  resetGame() {
    this.refs.board.resetBoard();
    this.setState({
      turn: 'black'
    });
  }

  skipTurn() {
    this.setState({
      turn: (this.state.turn === "black") ? "white" : "black"
    });
  }

  getGameResult() {
    const black_cnt = this.state.squareStates.filter((square_state) => square_state === "black").length;
    const white_cnt = this.state.squareStates.filter((square_state) => square_state === "white").length;
    const game_result = {
      "is_draw" : false,
      "winner" : "",
      "winner_str" : "",
      "diff" : 0
    };
    if (black_cnt === white_cnt) {
      game_result.is_draw = true;
    } else {
      game_result.winner = (black_cnt > white_cnt) ? "black" : "white";
      game_result.diff = Math.abs(black_cnt - white_cnt);
    }
    return game_result;
  }

  noticeFromBoard() {
    this.changeTurn();
  }

  changeTurn() {
    const next = (this.state.turn === "black") ? "white" : "black";
    this.setState({turn: next});
  }

  render() {
    /*
    if (!this.state.squareStates.some((square_state) => square_state == "")) {
      console.log("ゲーム終了")
      const game_result = this.getGameResult();
      if (game_result.is_draw) {
        console.log("引き分けです");
      } else {
        const winner_str = (game_result.winner === "black") ? "黒" : "白";
        console.log(winner_str + "の" + game_result.diff + "石勝ちです");
      }
    }
    */
    return (
      <div>
        <Desc turn={this.state.turn}/>
        <SkipTurn skipTurn={this.skipTurn}/>
        <ResetGame resetGame={this.resetGame}/>
        <Board
          turn={this.state.turn}
          noticeToGame={this.noticeFromBoard}
          ref="board"
        />
      </div>
    );
  }
}
