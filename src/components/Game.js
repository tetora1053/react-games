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
      gameResult: {
        isEnd: false,
        isDraw: false,
        winner: "",
        diff: 0,
      }
    }
    this.skipTurn = this.skipTurn.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.noticeFromBoard = this.noticeFromBoard.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.gameResult.isEnd) {
      console.log("already end");
      return;
    }

    let res = this.canPutStone();
    console.log("canPutStone res : ", res);
    if (!res) {
      let next_turn = (this.state.turn === "black") ? "white" : "black";
      let another_res = this.canPutStone(another_res);
      if (!another_res) {
        console.log("game end");
        const game_result = this.refs.board.getGameResult();
        if (game_result.black !== game_result.white) {
          const winner = (game_result.black > game_result.white) ? "black" : "white";
          const diff = Math.abs(game_result.black - game_result.white);
          this.setState({
            gameResult: {
              isEnd: true,
              winner: winner,
              diff: diff,
            }
          });
        } else {
          this.setState({
            gameResult: {
              isEnd: true,
              isDraw: true,
            }
          });
        }
        return;
      }
      this.refs.skip_turn.enable();
    }
  }

  canPutStone() {
    let res = this.refs.board.canPutStone();
    return res;
  }

  check() {
    console.log("check");
  }

  resetGame() {
    this.refs.board.resetBoard();
    this.setState({
      turn: 'black',
      gameResult: {
        isEnd: false,
        isDraw: false,
        winner: "",
        diff: 0,
      }
    });
  }

  skipTurn() {
    this.setState({
      turn: (this.state.turn === "black") ? "white" : "black"
    });
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
        <Desc
          turn={this.state.turn}
          gameResult={this.state.gameResult}
        />
        <SkipTurn
          skipTurn={this.skipTurn}
          ref="skip_turn"
        />
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
